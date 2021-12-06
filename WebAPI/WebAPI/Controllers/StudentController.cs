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

                FindRoomInfo.CommandText = "select room_id, roomNumber, maxOccupants from housingdirector_schema.room_tbl where dorm_id = @dorm_id and floorNumber = @floorNumber";
                FindRoomInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindRoomInfo.ExecuteReader();

                while (reader.Read())
                {
                    roomList.Add(new RoomTblFields()
                    {
                        room_id = reader[0].ToString(),
                        roomNumber = reader[1].ToString(),
                        maxOccupants = reader[2].ToString(),
                    });
                }
                reader.Close();
            }
            return roomList;
        }
    }
}
