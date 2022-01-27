using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        // HousingDBContext holds onto name of database tables
        private readonly HousingDBContext _context;

        private IConfiguration _configuration;

        // Finds MySQL connection so can access database tables
        private MySqlConnection GetConnection()
        {
            string myConnectionString = _configuration.GetConnectionString("DevConnection"); //Configuration.GetConnectionString("DevConnection");
            return new MySqlConnection(myConnectionString);
        }

        public StudentController(HousingDBContext context, IConfiguration configuration)
        {
            // Object to HousingDBContext class
            _context = context;
            _configuration = configuration;
        }


        [HttpPost]
        public studentTblFields GetStudentInfo(studentTblFields check)
        {
            System.Diagnostics.Debug.WriteLine(check.username);
            string usernameResult = null;
            string studentIDResult = null;
            string firstNameResult = null;
            string lastNameResult = null;
            string emailResult = null;

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand getID = conn.CreateCommand();

                getID.Parameters.AddWithValue("@username", check.username);

                getID.CommandText = "select studentID, username, firstName, lastName, email from housingdirector_schema.student_tbl where username = @username";

                MySqlDataReader ReturnedInfo = getID.ExecuteReader();

                while (ReturnedInfo.Read())
                {
                    studentIDResult = ReturnedInfo.GetString(0);
                    usernameResult = ReturnedInfo.GetString(1);
                    firstNameResult = ReturnedInfo.GetString(2);
                    lastNameResult = ReturnedInfo.GetString(3);
                    emailResult = ReturnedInfo.GetString(4);
                }
                ReturnedInfo.Close();

            }
            return new studentTblFields { studentID = studentIDResult, username = usernameResult, firstName = firstNameResult, lastName = lastNameResult, email = emailResult };
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDStudents(int id)
        {
            var dStudents = await _context.student_tbl.FindAsync(id);
            if (dStudents == null)
            {
                return NotFound();
            }

            _context.student_tbl.Remove(dStudents);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DStudentsExists(int id)
        {
            return _context.student_tbl.Any(e => e.user_id == id);
        }

        // Logs student into their account, will only allow them to access student pages
        [Route("api/DStudent/Login")]
        [HttpPost]
        public Response StudentLogin(Login login)
        {

            var log = _context.student_tbl.Where(x => x.username.Equals(login.username) &&
                      x.password.Equals(login.password)).FirstOrDefault();

            if (log == null)
            {
                return new Response { Status = "Invalid", Message = "Invalid User." };
            }
            else
                return new Response { Status = "Success", Message = "Login Successfully" };
        }


        [Route("FindRoommateInfo/{sFirstNameToSearch}")]
        [HttpPost]
        public List<studentTblFields> FindRoommateInfo(string sFirstNameToSearch)
        {
            List<studentTblFields> eventData = new List<studentTblFields>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand getUsersInfo = conn.CreateCommand();

                getUsersInfo.Parameters.AddWithValue("@username", sFirstNameToSearch);
                getUsersInfo.CommandText = "select user_id, firstname, lastname, year from housingdirector_schema.student_tbl where username like @username";
                getUsersInfo.ExecuteNonQuery();

                MySqlDataReader reader = getUsersInfo.ExecuteReader();

                while (reader.Read())
                {

                    eventData.Add(new studentTblFields()
                    {
                        user_id = Convert.ToInt32(reader[0]),
                        firstName = reader[1].ToString(),
                        lastName = reader[2].ToString(),
                        year = reader[3].ToString(),
                    });
                }
                reader.Close();
            }

            return eventData;
        }

        [Route("AddRoommate/{roommateToAdd}")]
        [HttpPost]
        public Response AddRoommate(studentTblFields roommate)
        {

            return new Response { Status = "Invalid", Message = "Cannot" };
        }


        // DormSelection Page..
        // Need to get dorm info
        // Find Student Accounts that match a few characters (Student profile on Admin page after search page)
        [Route("FindBuildingInfo")]
        [HttpGet]
            public List<DormInfo> FindBuildingInfo()
        {
            List<DormInfo> dormData = new List<DormInfo>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand FindBuildingInfo = conn.CreateCommand();

                FindBuildingInfo.CommandText = "select * from housingdirector_schema.dorm_tbl";
                FindBuildingInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindBuildingInfo.ExecuteReader();

                while (reader.Read())
                {
                    dormData.Add(new DormInfo()
                    {
                        dorm_id = reader[0].ToString(),
                        name = reader[1].ToString(),
                        description = reader[2].ToString(),
                        url = reader[3].ToString(),
                    });
                }
                reader.Close();
            }
            return dormData;
        }
        


        // Find the floor numbers that have rooms available
        [Route("FindFloorInfo/{dorm_id}")]
        [HttpGet]
        public List<FloorInfo> FindFloorInfo(string dorm_id)
        {
            List<FloorInfo> floorNumsForBuilding = new List<FloorInfo>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand FindFloorInfo = conn.CreateCommand();

                FindFloorInfo.Parameters.AddWithValue("@dorm_id", dorm_id);
                FindFloorInfo.CommandText = "select floorNumber from housingdirector_schema.room_tbl where dorm_id = @dorm_id";
                FindFloorInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindFloorInfo.ExecuteReader();

                while (reader.Read())
                {
                    floorNumsForBuilding.Add(new FloorInfo()
                    {
                        floorNumber = reader[0].ToString(),
                    });
                }
                reader.Close();
            }
            return floorNumsForBuilding;
        }

        // Find the floor numbers that have rooms available
        [Route("FindRoomInfo")]
        [HttpPost]
        public List<RoomTblFields> FindRoomInfo(GetRoomInfoParams paramsObj)
        {
            List<RoomTblFields> roomList = new List<RoomTblFields>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand FindRoomInfo = conn.CreateCommand();

                FindRoomInfo.Parameters.AddWithValue("@dorm_id", paramsObj.dorm_id);
                FindRoomInfo.Parameters.AddWithValue("@floorNumber", paramsObj.floorNumber);

                FindRoomInfo.CommandText = "select room_id, roomNumber, maxOccupants, roomDescription, currentOccupants from housingdirector_schema.room_tbl where dorm_id = @dorm_id and floorNumber = @floorNumber";
                FindRoomInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindRoomInfo.ExecuteReader();

                while (reader.Read())
                {
                    // true if maxOccupants != currurrentOccupants
                    if (reader[2] != reader[4])
                    {
                        roomList.Add(new RoomTblFields()
                        {
                            room_id = reader[0].ToString(),
                            roomNumber = reader[1].ToString(),
                            maxOccupants = reader[2].ToString(),
                            roomDescription = reader[3].ToString(),
                            currentOccupants = reader[4].ToString()
                        });
                    }
                }
                reader.Close();
            }
            return roomList;
        }

        // INSERT INTO housingdirector_schema.occupants_tbl (dorm_id, room_id, roomNumber, residentID) VALUES ();
        // Create student account
        [Route("SubmitDormApproval/{studentID}")]
        [HttpGet]
        public Response SubmitDormForm(DormOccupantsTblFields dormOccupantsTBL)
        {
            // ***************Update studentsSoFar field in room_tbl*****************

            // For later use in order to update MySQL database
            /*     if (CheckConditionsValidation(student, "AddStudent"))
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
            */
//            if (!bValid)
 //           {
 //               return new Response { Status = "Invalid", Message = "Cannot" };
 //           }

            return new Response { Status = "Success", Message = "Form submitted Successfully. An administrator will be in touch with you." };
        }

        [Route("GetDormOccupants")]
        [HttpPost]
        public List<studentTblFields> GetDormOccupants(int roomID)
        {
            List<studentTblFields> occupants = new List<studentTblFields>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand FindRoomInfo = conn.CreateCommand();

                FindRoomInfo.Parameters.AddWithValue("@room_id", roomID);

                FindRoomInfo.CommandText =
                    "USE housingdirector_schema;" +
                "SELECT dormOccupants_tbl.resident_ID, student_tbl.firstName, student_tbl.lastName, dormOccupants_tbl.room_ID, student_tbl.studentID" +
                " FROM dormOccupants_tbl" +
                " INNER JOIN student_tbl ON student_tbl.user_id = dormOccupants_tbl.resident_ID" +
                " WHERE room_ID = @room_id;";

                FindRoomInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindRoomInfo.ExecuteReader();

                while (reader.Read())
                {
                    // true if maxOccupants != currurrentOccupants
                    //if (reader[2] != reader[4])
                    //{
                    occupants.Add(new studentTblFields()
                    {
                        studentID = reader.GetString(4),
                        //usernameResult = ReturnedInfo.GetString(1);
                        firstName = reader.GetString(1),
                        lastName = reader.GetString(2),
                        //emailResult = ReturnedInfo.GetString(4);
                    });
                }
                reader.Close();
            }
            return occupants;
        }
    }
}
