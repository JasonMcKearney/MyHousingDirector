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
            string myConnectionString = _configuration.GetConnectionString("DevConnection"); //Configuration.GetConnectionString("DevConnection");
            return new MySqlConnection(myConnectionString);
            //       throw new NotImplementedException();
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

        // Create student account
        [Route("AddStudent")]
        [HttpPost]
        public Response AddStudent(StudentsViewModel student)
        {
            bool bSuccessfull = false;

            if (student.username.Length > 0 && student.email.Length > 0 && student.password.Length >
        0 && student.confirmpassword.Length > 0 && student.gender.Length > 0 && student.year.Length > 0 && student.studentID.Length > 0)
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand CheckUser = conn.CreateCommand();

                    // Checks to see if there are duplicate usernames
                    CheckUser.Parameters.AddWithValue("@username", student.username);
                    CheckUser.CommandText = "select count(*) from housingdirector_schema.DBUserTbls where userName = @userName";

                    // if 1 then already exist
                    int UserExist = Convert.ToInt32(CheckUser.ExecuteScalar());

                    if (UserExist >= 1)
                    {
                        bSuccessfull = false;
                        return new Response { Status = "User Exists", Message = "Cannot" };
                    }
                    else
                    {
                        //   // Hash password
                        //   uc.password = BCrypt.Net.BCrypt.HashPassword(uc.password);
                        //   uc.confirmPassword = BCrypt.Net.BCrypt.HashPassword(uc.confirmPassword);

                        // Inserting data into fields of database
                        MySqlCommand Query = conn.CreateCommand();
                        Query.CommandText = "insert into housingdirector_schema.DBUserTbls (username, firstname, lastname, email, password, confirmpassword, gender, year, studentID) VALUES (@username, @firstname, @lastname, @email, @password, @confirmpassword, @gender, @year, @studentID)";
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
        public List<StudentsViewModel> FindStudents(string sUsernameToSearch)
        {
            List <StudentsViewModel> eventData = new List<StudentsViewModel>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                // Check if there are more than one student that matches the username entered
                MySqlCommand FindTotalUsers = conn.CreateCommand();
                FindTotalUsers.Parameters.AddWithValue("@username", sUsernameToSearch + "%");
                FindTotalUsers.CommandText = "SELECT count(*) FROM housingdirector_schema.DBUserTbls where username like @username";
                FindTotalUsers.ExecuteNonQuery();

                // If nNumStudents is 1 then there are at least one student account created to check
                int nNumStudents = Convert.ToInt32(FindTotalUsers.ExecuteScalar());

                if (nNumStudents >= 1)
                {
                    MySqlCommand FindUsersLike = conn.CreateCommand();

                    // Pulls all students usernames like entered characters
                    FindUsersLike.Parameters.AddWithValue("@username", sUsernameToSearch + "%");
                    FindUsersLike.CommandText = "select username from housingdirector_schema.DBUserTbls where username like @username";

                    FindUsersLike.ExecuteNonQuery();

                    // Execute the SQL command against the DB:
                    MySqlDataReader reader = FindUsersLike.ExecuteReader();

                    while (reader.Read()) // Read returns false if the user does not exist!
                    {
                        eventData.Add(new StudentsViewModel()
                        {
                            username = reader[0].ToString()
                        });
                    }
                    reader.Close();
                }
                else
				{
                    eventData.Add(new StudentsViewModel()
                    {
                        username = ""
                    });
                }
            }
            return eventData;
        }

        // Find Student Accounts that match a few characters (Search functionality on Admin page)
        [Route("FindStudentInfo/{sUsernameToSearch}")]
        [HttpPost]
        public List<StudentsViewModel> FindStudentInfo(string sUsernameToSearch)
        {
            List<StudentsViewModel> eventData = new List<StudentsViewModel>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();   
                MySqlCommand FindUsersInfo = conn.CreateCommand();

                // Pulls all students usernames like entered characters
                FindUsersInfo.Parameters.AddWithValue("@username", sUsernameToSearch);
                FindUsersInfo.CommandText = "select firstname, lastname, username, email, year, password from housingdirector_schema.DBUserTbls where username = @username";

                FindUsersInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindUsersInfo.ExecuteReader();

                while (reader.Read()) // Read returns false if the user does not exist!
                {
                    eventData.Add(new StudentsViewModel()
                    {
                        firstName = reader[0].ToString(),
                        lastName = reader[1].ToString(),
                        username = reader[2].ToString(),
                        email = reader[3].ToString(),
                        year = reader[4].ToString(),
                        password = reader[5].ToString(),
                    });
                   
                }
                reader.Close();
            }
            return eventData;
        }
    }
}
