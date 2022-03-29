using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using WebAPI.Models;

using MailKit.Net.Smtp;
using MimeKit;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly HousingDBContext _context;

        private IConfiguration _configuration;

        private MySqlConnection GetConnection()
        {
            string myConnectionString = _configuration.GetConnectionString("DevConnection");
            return new MySqlConnection(myConnectionString);
        }

        public AdminController(HousingDBContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Will pull username and password from DB and check if that is what user typed in
        // Bring them to the corresponding page Student or Admin home page
        [Route("Login")]
        [HttpPost]
        public Response AdminLogin(Login login)
        {
            var log = _context.admin_tbl.Where(x => x.username.Equals(login.username) &&
                      x.password.Equals(login.password)).FirstOrDefault();

            if (log == null)
            {
                return new Response { Status = "Invalid", Message = "Invalid User." };
            }
            else
                return new Response { Status = "Success", Message = "Login Successfully" };
        }

        // Conditions checking length of a variable are checked here..
        bool CheckConditionsValidation(studentTblFields student, string functionName)
        {
            bool bRet = false;
            // For AddStudent function
            if (functionName == "AddStudent")
            {
                if (student.firstName.Length > 0 && student.lastName.Length > 0 && student.username.Length > 0 && student.email.Length > 0 && student.password.Length >
                0 && student.confirmpassword.Length > 0 && student.gender.Length > 0 && student.year.Length > 0 && student.studentID.Length > 0 && functionName == "AddStudent")
                {
                    bRet = true;
                }
            }
            // For UpdateProfile function below
            else
            {
                if (student.firstName.Length > 0 && student.lastName.Length > 0 && student.username.Length > 0 && student.email.Length > 0
                    && student.password.Length > 0 && student.year.Length > 0)
                {
                    bRet = true;
                }
            }
            return bRet;
        }

        // Create student account
        [Route("AddStudent")]
        [HttpPost]
        public Response AddStudent(studentTblFields student)
        {
            bool bSuccessfull = false;

            if (CheckConditionsValidation(student, "AddStudent"))
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand CheckUser = conn.CreateCommand();

                    // Checks to see if there are duplicate usernames
                    CheckUser.Parameters.AddWithValue("@username", student.username);
                    CheckUser.CommandText = "select count(*) from housingdirector_schema.student_tbl where userName = @userName";

                    // if 1 then already exist
                    int UserExist = Convert.ToInt32(CheckUser.ExecuteScalar());

                    if (UserExist >= 1)
                    {
                        bSuccessfull = false;
                        return new Response { Status = "User Exists", Message = "Cannot" };
                    }
                    else
                    {
                        // Inserting data into fields of database
                        MySqlCommand Query = conn.CreateCommand();
                        Query.CommandText = "insert into housingdirector_schema.student_tbl (username, firstname, lastname, email, password, confirmpassword, gender, year, studentID) VALUES (@username, @firstname, @lastname, @email, @password, @confirmpassword, @gender, @year, @studentID)";
                        Query.Parameters.AddWithValue("@username", student.username);
                        Query.Parameters.AddWithValue("@firstname", student.firstName);
                        Query.Parameters.AddWithValue("@lastname", student.lastName);
                        Query.Parameters.AddWithValue("@email", student.email);
                        Query.Parameters.AddWithValue("@password", student.password);
                        Query.Parameters.AddWithValue("@confirmpassword", student.confirmpassword);
                        Query.Parameters.AddWithValue("@gender", student.gender);
                        Query.Parameters.AddWithValue("@year", student.year);
                        Query.Parameters.AddWithValue("@studentID", student.studentID);

                        Query.ExecuteNonQuery();
                        bSuccessfull = true;
                    }
                }
            }

            if (!bSuccessfull)
            {
                return new Response { Status = "Invalid", Message = "Cannot" };
            }

            return new Response { Status = "Success", Message = "Login Successfully" };
        }

        // Find Student Accounts that match a few characters (Search functionality on Admin page)
        [Route("FindStudents/{sUsernameToSearch}")]
        [HttpPost]
        public List<studentTblFields> FindStudents(string sUsernameToSearch)
        {
            List<studentTblFields> eventData = new List<studentTblFields>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                // Check if there are more than one student that matches the username entered
                MySqlCommand FindTotalUsers = conn.CreateCommand();
                FindTotalUsers.Parameters.AddWithValue("@username", sUsernameToSearch + "%");
                FindTotalUsers.CommandText = "SELECT count(*) FROM housingdirector_schema.student_tbl where username like @username";
                FindTotalUsers.ExecuteNonQuery();

                // If nNumStudents is 1 then there are at least one student account created to check
                int nNumStudents = Convert.ToInt32(FindTotalUsers.ExecuteScalar());

                if (nNumStudents >= 1)
                {
                    MySqlCommand FindUsersLike = conn.CreateCommand();

                    // Pulls all students usernames that match entered characters
                    FindUsersLike.Parameters.AddWithValue("@username", sUsernameToSearch + "%");
                    FindUsersLike.CommandText = "select username,user_id from housingdirector_schema.student_tbl where username like @username";

                    FindUsersLike.ExecuteNonQuery();

                    // Execute the SQL command against the DB:
                    MySqlDataReader reader = FindUsersLike.ExecuteReader();

                    while (reader.Read()) // Read returns false if the user does not exist!
                    {
                        eventData.Add(new studentTblFields()
                        {
                            username = reader[0].ToString(),
                            user_id = reader.GetInt32(1)
                        });
                    }
                    reader.Close();
                }
                else
                {
                    eventData.Add(new studentTblFields()
                    {
                        username = "",
                        user_id = 0
                    });
                }
            }
            return eventData;
        }

        // Find Student Accounts that match a few characters (Student profile on Admin page after search page)
        [Route("FindStudentInfo/{sUsernameToSearch}")]
        [HttpPost]
        public List<studentTblFields> FindStudentInfo(string sUsernameToSearch)
        {
            List<studentTblFields> eventData = new List<studentTblFields>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand FindUsersInfo = conn.CreateCommand();

                // Pulls all students usernames like entered characters
                FindUsersInfo.Parameters.AddWithValue("@username", sUsernameToSearch);
                FindUsersInfo.CommandText = "select user_id, firstname, lastname, username, email, year, password from housingdirector_schema.student_tbl where username = @username";

                FindUsersInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindUsersInfo.ExecuteReader();

                while (reader.Read()) // Read returns false if the user does not exist!
                {
                    eventData.Add(new studentTblFields()
                    {
                        user_id = Int32.Parse(reader[0].ToString()),
                        firstName = reader[1].ToString(),
                        lastName = reader[2].ToString(),
                        username = reader[3].ToString(),
                        email = reader[4].ToString(),
                        year = reader[5].ToString(),
                        password = reader[6].ToString(),
                    }); ;

                }
                reader.Close();
            }
            return eventData;
        }

        // Create student account
        [Route("UpdateProfile")]
        [HttpPost]
        public Response UpdateProfile(studentTblFields student)
        {
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand CheckUser = conn.CreateCommand();

                    // Inserting data into fields of database
                    MySqlCommand Query = conn.CreateCommand();
                    Query.CommandText = "update housingdirector_schema.student_tbl set firstName=@firstname, lastName=@lastname, " +
                        "email=@email, year=@year, password=@password where user_id=@userid";
                    Query.Parameters.AddWithValue("@firstname", student.firstName);
                    Query.Parameters.AddWithValue("@lastname", student.lastName);
                    Query.Parameters.AddWithValue("@email", student.email);
                    Query.Parameters.AddWithValue("@year", student.year);
                    Query.Parameters.AddWithValue("@password", student.password);
                    Query.Parameters.AddWithValue("@userid", student.user_id);

                    Query.ExecuteNonQuery();
                }
            }
            catch (Exception)
            {
                return new Response { Status = "Invalid", Message = "Update Student info unsuccessful." };
            }

            return new Response { Status = "Success", Message = "Updated Student Info" };
        }

        [Route("DeleteStudentProfile/{user_id}")]
        [HttpPost]
        // Delete a student
        public Response DeleteStudent(int user_id)
        {
            bool bSuccessfull = false;

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand CheckUser = conn.CreateCommand();

                // Checks to see if there are duplicate usernames
                CheckUser.Parameters.AddWithValue("@userid", user_id);
                CheckUser.CommandText = "select count(*) from housingdirector_schema.student_tbl where user_id != @userid";

                // if 1 then already exist
                int UserExist = Convert.ToInt32(CheckUser.ExecuteScalar());

                if (UserExist >= 1)
                {
                    // Inserting data into fields of database
                    MySqlCommand Query = conn.CreateCommand();
                    Query.CommandText = "delete from student_tbl where user_id = @userid";
                    Query.Parameters.AddWithValue("@userid", user_id);

                    Query.ExecuteNonQuery();
                    bSuccessfull = true;
                }
            }

            if (!bSuccessfull)
            {
                return new Response { Status = "Invalid", Message = "Could not find student data." };
            }

            return new Response { Status = "Success", Message = "Deleted student." };
        }

        [Route("GetAdminDashboardData")]
        [HttpGet]
        public AdminDashboardInfo GetAdminDashboardData()
        {
            AdminDashboardInfo dashboardInfo = new AdminDashboardInfo();

            // Get total students on campus
            using (MySqlConnection conn = GetConnection())
            {
                try
                {
                    conn.Open();
                    MySqlCommand GetTotalStudents = conn.CreateCommand();

                    GetTotalStudents.CommandText = "select count(user_id) as numberOfStudents from housingdirector_schema.student_tbl";

                    dashboardInfo.nTotalStudents = Convert.ToInt32(GetTotalStudents.ExecuteScalar());
                }
                catch (Exception e)
                {
                    dashboardInfo.message.Add(new Response { Status = "Invalid Response", Message = e.Message });
                }
            }

            // Get total dorm requests on campus
            using (MySqlConnection conn2 = GetConnection())
            {
                try
                {
                    conn2.Open();
                    MySqlCommand GetTotalRequests = conn2.CreateCommand();

                    GetTotalRequests.CommandText = "select count(submissionState) as numberOfRequests from housingdirector_schema.dormOccupants_tbl where submissionState = @submissionState";
                    GetTotalRequests.Parameters.AddWithValue("@submissionState", "requested");

                    dashboardInfo.nTotalDormRqsts = Convert.ToInt32(GetTotalRequests.ExecuteScalar());
                }
                catch (Exception e)
                {
                    dashboardInfo.message.Add(new Response { Status = "Invalid Response", Message = e.Message });
                }
            }

            // Finds max student capacity in each dorm building
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand FindBuildingInfo = conn.CreateCommand();
                FindBuildingInfo.CommandText = "select dorm_id, name, sizeBuilding from housingdirector_schema.Building_tbl";
                FindBuildingInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindBuildingInfo.ExecuteReader();
                dashboardInfo.totalStdntsInBuildingsList = new List<DormBuilding>();
                while (reader.Read())
                {
                    dashboardInfo.totalStdntsInBuildingsList.Add(new DormBuilding
                    {
                        dorm_id = reader[0].ToString(),
                        name = reader[1].ToString(),
                        sizeBuilding = (int)reader[2]
                    });
                }
                reader.Close();
            }

            // Finds available dorm buildings
            using (MySqlConnection conn = GetConnection())
            {
                List<string> buildingNames = new List<string>();
                var totalRoomsAvailable = new List<KeyValuePair<int, string>>();

                conn.Open();
                MySqlCommand FindBuildingInfo = conn.CreateCommand();
                FindBuildingInfo.CommandText = "select dorm_id from housingdirector_schema.room_tbl where currentOccupants < maxOccupants";
                FindBuildingInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindBuildingInfo.ExecuteReader();
                while (reader.Read())
                {
                    // Trying to add name and id into keyvaluepair
                    string id = reader[0].ToString();
                    // Finds object that has the specific dorm_id in totalSTdntsInBuildings list
                    var obj = dashboardInfo.totalStdntsInBuildingsList.FirstOrDefault(o => o.dorm_id == id);
                    // Gets the name saved in instance of class DormBuilding
                    string name = obj.name;

                    buildingNames.Add(name);
                }
                reader.Close();

                // Counts duplicates that are in a list using linq
                var q = from x in buildingNames
                        group x by x into g
                        let count = g.Count()
                        orderby count descending
                        select new { Value = g.Key, Count = count };

                dashboardInfo.availableBuildingsList = new List<DormBuilding>();
                // Loop through list and count values
                foreach (var x in q)
                {
                    // Adds name of building and how many dorm rooms are open as an object to the list
                    dashboardInfo.availableBuildingsList.Add(new DormBuilding
                    {
                        numRoomsAvailable = x.Count,
                        name = x.Value.ToString()
                    });
                }
            }

            // Sorts dictionary
            var sortedList = from entry in dashboardInfo.availableBuildingsList orderby entry.numRoomsAvailable ascending select entry;
            // Gets first value in list
            dashboardInfo.sPopularBuilding = sortedList.ElementAt(0).name.ToString();

            return dashboardInfo;
        }





        [Route("GetAdminDashboardRequests")]
        [HttpGet]
        public List<AdminDormRequestData> GetAdminDashboardRequests()
        {
            List<AdminDormRequestData> requestDataList = new List<AdminDormRequestData>();
            List<TempIDsStruct> tempIDList = new List<TempIDsStruct>();

            // Open the MySql connection
            using (MySqlConnection conn = GetConnection())
            {
                // Get IDs
                try
                {
                    conn.Open();
                    MySqlCommand GetRequestData = conn.CreateCommand();
                    GetRequestData.CommandText = "select record_ID, dorm_ID, room_ID, roomNumber, studentName, submissionState from housingdirector_schema.dormOccupants_tbl;";

                    GetRequestData.ExecuteNonQuery();

                    // Execute the SQL command against the DB:
                    MySqlDataReader reader = GetRequestData.ExecuteReader();
                    while (reader.Read())
                    {
                        // Populate tempIDList with ids that are used to figure out name of building, room
                        tempIDList.Add(new TempIDsStruct
                        {
                            record_ID = reader[0].ToString(),
                            dorm_ID = reader[1].ToString(),
                            room_ID = reader[2].ToString()
                        });

                        // Save values into AdminDormRequestData class so can pass list to React JS to retrieve and manipulate the data
                        requestDataList.Add(new AdminDormRequestData
                        {
                            record_ID = reader[0].ToString(),
                            roomNumber = reader[3].ToString(),
                            studentName = reader[4].ToString(),
                            submissionState = reader[5].ToString()                            
                        });
                    }
                    reader.Close();
                }
                catch (Exception e)
                {
                    //TempIDsStruct tempObject = new TempIDsStruct();
                    requestDataList.Add(new TempIDsStruct
                    {
                        message = (new Response { Status = "Invalid Response", Message = e.Message })
                    });  
                }

                // Find names using IDs saved inside of struct object and then save data into AdminDormRequestData class to send to React.js in JSON
                try
                {
                    for (int counter = 0; counter < tempIDList.Count(); counter++)
                    {
                        conn.Open();
                        MySqlCommand GetRequestData2 = conn.CreateCommand();
                        GetRequestData2.CommandText = " select b.name, r.floorNumber from Building_tbl b cross join room_tbl r on b.dorm_id = @dormID and r.room_id = @roomID";
                        GetRequestData2.Parameters.AddWithValue("@dormid", tempIDList[counter].dorm_ID);
                        GetRequestData2.Parameters.AddWithValue("@dormid", tempIDList[counter].room_ID);
                        GetRequestData2.ExecuteNonQuery();

                        // Execute the SQL command against the DB:
                        MySqlDataReader reader = GetRequestData2.ExecuteReader();
                        while (reader.Read())
                        {
                            // Populate tempIDList with ids that are used to figure out name of building, room
                            tempIDList.Add(new TempIDsStruct
                            {
                                record_ID = reader[0].ToString(),
                                dorm_ID = reader[1].ToString(),
                                room_ID = reader[2].ToString()
                            });
                        }
                        reader.Close();
                    }
                    
                }
                catch (Exception e)
                {
                    requestDataList.Add(new AdminDormRequestData
                    {
                        message = (new Response { Status = "Invalid Response", Message = e.Message })
                    });
                }
            }

            return requestDataList;
        }

        struct TempIDsStruct{
            public string record_ID;
            public string dorm_ID;
            public string room_ID;
            public Response message;
        }
    }
}
