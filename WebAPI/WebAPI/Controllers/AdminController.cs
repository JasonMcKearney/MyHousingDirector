using System;
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
                        }) ;
                    }
                    reader.Close();
                }
                else
                {
                    eventData.Add(new studentTblFields()
                    {
                        username = "",
                        user_id = 0
                    }) ;
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

    }
}
