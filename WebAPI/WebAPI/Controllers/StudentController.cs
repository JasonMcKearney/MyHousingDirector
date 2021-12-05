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

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand getID = conn.CreateCommand();

                getID.Parameters.AddWithValue("@username", check.username);
                getID.CommandText = "select studentID, username from housingdirector_schema.student_tbl where username = @username";
                
                MySqlDataReader ReturnedInfo = getID.ExecuteReader();

                while (ReturnedInfo.Read())
                {
                    usernameResult = ReturnedInfo.GetString(1);
                    studentIDResult = ReturnedInfo.GetString(0);
                }
                ReturnedInfo.Close();

            }
            return new studentTblFields { studentID = studentIDResult, username = usernameResult };
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

        // DormSelection Page..
        // Need to get dorm info
        // Find Student Accounts that match a few characters (Student profile on Admin page after search page)
        [Route("FindDormInfo")]
        [HttpGet]
        public List<DormInfo> FindDormInfo()
        {
            List<DormInfo> dormData = new List<DormInfo>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand FindUsersInfo = conn.CreateCommand();

                FindUsersInfo.CommandText = "select * from housingdirector_schema.dorm_tbl";
                FindUsersInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindUsersInfo.ExecuteReader();

                while (reader.Read()) // Read returns false if the user does not exist!
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

        [Route("FindFloorInfo")]
        [HttpGet]
        public List<DormInfo> FindFloorInfo()
        {
            List<DormInfo> dormData = new List<DormInfo>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand FindUsersInfo = conn.CreateCommand();

                FindUsersInfo.CommandText = "select * from housingdirector_schema.dorm_tbl";
                FindUsersInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindUsersInfo.ExecuteReader();

                while (reader.Read()) // Read returns false if the user does not exist!
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
    }
}
