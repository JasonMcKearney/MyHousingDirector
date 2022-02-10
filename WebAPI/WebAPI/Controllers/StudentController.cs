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
            string useridResult = null;

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand getID = conn.CreateCommand();

                getID.Parameters.AddWithValue("@username", check.username);

                getID.CommandText = "select studentID, username, firstName, lastName, email, user_id from housingdirector_schema.student_tbl where username = @username";

                MySqlDataReader ReturnedInfo = getID.ExecuteReader();

                while (ReturnedInfo.Read())
                {
                    studentIDResult = ReturnedInfo.GetString(0);
                    usernameResult = ReturnedInfo.GetString(1);
                    firstNameResult = ReturnedInfo.GetString(2);
                    lastNameResult = ReturnedInfo.GetString(3);
                    emailResult = ReturnedInfo.GetString(4);
                    useridResult = ReturnedInfo.GetString(5);
                }
                ReturnedInfo.Close();

            }
            return new studentTblFields { user_id = Int32.Parse(useridResult), studentID = studentIDResult, username = usernameResult, firstName = firstNameResult, lastName = lastNameResult, email = emailResult, };
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

                getUsersInfo.Parameters.AddWithValue("@username", sFirstNameToSearch + '%');
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

        [Route("DeleteRoommate")]
        [HttpPost]
        public Response DeleteRoommate(RoomRequestIds ids)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                int requestor_id = Convert.ToInt32(ids.uid);

                MySqlCommand FindRecipientID = conn.CreateCommand();
                FindRecipientID.Parameters.AddWithValue("@studentID", ids.reciever_id);
                FindRecipientID.CommandText = "select user_id from housingdirector_schema.student_tbl where studentID = @studentID";
                int recipient_id = Convert.ToInt32(FindRecipientID.ExecuteScalar());


                MySqlCommand CheckRequest = conn.CreateCommand();
                CheckRequest.Parameters.AddWithValue("@requestorID", requestor_id);
                CheckRequest.Parameters.AddWithValue("@recieverID", recipient_id);
                CheckRequest.CommandText = "select count(*) from housingdirector_schema.roommates_table where Requestor_ID = @requestorID AND roommate_ID = @recieverID";

                int requestExsits = Convert.ToInt32(CheckRequest.ExecuteScalar());

                if (requestExsits >= 1)
                {
                    MySqlCommand DeleteEntry = conn.CreateCommand();
                    DeleteEntry.Parameters.AddWithValue("@requestorID", requestor_id);
                    DeleteEntry.Parameters.AddWithValue("@recieverID", recipient_id);
                    DeleteEntry.CommandText = "DELETE from housingdirector_schema.roommates_table where Requestor_ID = @requestorID AND roommate_ID = @recieverID";
                    DeleteEntry.ExecuteNonQuery();
                    return new Response { Status = "Delete successful", Message = "Deleted matching entry" };

                }
                else
                {
                    return new Response { Status = "No matching entry", Message = "There is no entry matching the parameters" };
                }
                   
            }
        }

        [Route("AddRoommate")]
        [HttpPost]
        public Response AddRoommate(RoomRequestIds ids)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();

                MySqlCommand FindRequestorID = conn.CreateCommand();
                FindRequestorID.Parameters.AddWithValue("@studentID", ids.uid);
                FindRequestorID.CommandText = "select user_id from housingdirector_schema.student_tbl where studentID = @studentID";

                int requestor_id = Convert.ToInt32(FindRequestorID.ExecuteScalar());


                MySqlCommand CheckRequest = conn.CreateCommand();
                CheckRequest.Parameters.AddWithValue("@requestorID", requestor_id);
                CheckRequest.Parameters.AddWithValue("@recieverID", ids.reciever_id);
                CheckRequest.CommandText = "select count(*) from housingdirector_schema.roommates_table where Requestor_ID = @requestorID AND roommate_ID = @recieverID";

                int requestExsits = Convert.ToInt32(CheckRequest.ExecuteScalar());

                if (requestExsits >= 1)
                {
                    return new Response { Status = "Request Exsists", Message = "Already requested that student" };
                }
                else
                {
                    MySqlCommand Query = conn.CreateCommand();
                    Query.CommandText = "insert into housingdirector_schema.roommates_table (roommate_ID,Requestor_ID,RequestState) VALUES (@roommateID, @requestorID, @pending)";
                    Query.Parameters.AddWithValue("@roommateID", ids.reciever_id);
                    Query.Parameters.AddWithValue("@requestorID", requestor_id);
                    Query.Parameters.AddWithValue("@pending", "pending");

                    Query.ExecuteNonQuery();

                    return new Response { Status = "Request Sent", Message = "Request is successfully sent" };
                }

            }
        }

        // DormSelection Page..
        // Need to get dorm info
        // Find Student Accounts that match a few characters (Student profile on Admin page after search page)
        [Route("FindBuildingInfo")]
        [HttpGet]
        public List<DormBuilding> FindBuildingInfo()
        {
            List<DormBuilding> buildingData = new List<DormBuilding>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand FindBuildingInfo = conn.CreateCommand();

                FindBuildingInfo.CommandText = "select * from housingdirector_schema.dormBuilding_tbl";
                FindBuildingInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindBuildingInfo.ExecuteReader();

                while (reader.Read())
                {
                    buildingData.Add(new DormBuilding()
                    {
                        dorm_id = reader[0].ToString(),
                        name = reader[1].ToString(),
                        description = reader[2].ToString(),
                        url = reader[3].ToString(),
                        image1 = reader[4].ToString(),
                        image2 = reader[5].ToString()
                    });
                }
                reader.Close();
            }
            return buildingData;
        }
        
        // Find the floor numbers that have rooms available
        [Route("FindFloorInfo")]
        [HttpPost]
        public List<FloorInfoDormSelection> FindFloorInfo(FloorInfoDormSelection floorDetails)
        {
            List<FloorInfoDormSelection> floorNumsForBuilding = new List<FloorInfoDormSelection>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand FindFloorInfo = conn.CreateCommand();

                FindFloorInfo.Parameters.AddWithValue("@dorm_id", floorDetails.dorm_id);
                FindFloorInfo.Parameters.AddWithValue("@numRoommates", floorDetails.numRoommates);

                //FindFloorInfo.CommandText = "select floorNumber from housingdirector_schema.room_tbl where dorm_id = @dorm_id";

                // Select the floor number based upon the building, room size, maxOccupants = num_roommates + 1
                FindFloorInfo.CommandText = "select floorNumber from housingdirector_schema.room_tbl where dorm_id = @dorm_id and maxOccupants >= @numRoommates and currentOccupants = 0";

                FindFloorInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindFloorInfo.ExecuteReader();

                while (reader.Read())
                {
                    floorNumsForBuilding.Add(new FloorInfoDormSelection()
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
        public List<RoomTblFields> FindRoomInfo(GetRoomInfoDormSelection paramsObj)
        {
            List<RoomTblFields> roomList = new List<RoomTblFields>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand FindRoomInfo = conn.CreateCommand();

                FindRoomInfo.Parameters.AddWithValue("@dorm_id", paramsObj.dorm_id);
                FindRoomInfo.Parameters.AddWithValue("@floorNumber", paramsObj.floorNumber);
                FindRoomInfo.Parameters.AddWithValue("@numRoommates", paramsObj.numRoommates + 1);

                FindRoomInfo.CommandText = "select room_id, roomNumber, roomDescription, maxOccupants, image1, image2 from housingdirector_schema.room_tbl where dorm_id = @dorm_id and floorNumber = @floorNumber and maxOccupants >= @numRoommates and @numRoommates <= maxOccupants and currentOccupants >= 0";
                FindRoomInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindRoomInfo.ExecuteReader();

                while (reader.Read())
                {
                    roomList.Add(new RoomTblFields()
                    {
                        room_id = reader[0].ToString(),
                        roomNumber = reader[1].ToString(),
                        roomDescription = reader[2].ToString(),
                        maxOccupants = reader[3].ToString(),
                        image1 = reader[4].ToString(),
                        image2 = reader[5].ToString()
                    });
                    
                }
                reader.Close();
            }
            return roomList;
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
                "SELECT dormOccupants_tbl.resident_ID, student_tbl.firstName, student_tbl.lastName, student_tbl.username, dormOccupants_tbl.room_ID, student_tbl.studentID" +
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
                        studentID = reader.GetString(5),
                        //usernameResult = ReturnedInfo.GetString(1);
                        firstName = reader.GetString(1),
                        lastName = reader.GetString(2),
                        username = reader.GetString(3),
                        //emailResult = ReturnedInfo.GetString(4);
                    });
                }
                reader.Close();
            }
            return occupants;
        }

        [Route("SubmitDormApproval")]
        [HttpPost]
        public Response SubmitDormForm(DormOccupantsTblFields dormOccupantsTBL)
        {
            // Search for dorm_id, room_id in database tables
            using (MySqlConnection conn = GetConnection())
            {
                try
                {
                    conn.Open();
                    MySqlCommand GetIDs = conn.CreateCommand();

                    GetIDs.CommandText = "select room_tbl.room_id from room_tbl where floorNumber = @floorNumber and roomNumber = @roomNumber";
                    GetIDs.Parameters.AddWithValue("@floorNumber", dormOccupantsTBL.floorNumber);
                    GetIDs.Parameters.AddWithValue("@roomNumber", dormOccupantsTBL.roomNumber);
                    GetIDs.ExecuteNonQuery();

                    // Execute the SQL command against the DB:
                    MySqlDataReader reader = GetIDs.ExecuteReader();

                    while (reader.Read())
                    {
                        dormOccupantsTBL.room_ID = (int)reader[0];
                    }
                    reader.Close();
                }
                catch (Exception e)
                {
                    return new Response { Status = "Invalid Response", Message = e.Message };
                }
            }

            // Insert data into the DormOccupants_tbl
            using (MySqlConnection conn2 = GetConnection())
            {
                try
                {
                    conn2.Open();
                    MySqlCommand InsertDataDormOcupnts = conn2.CreateCommand();
                    InsertDataDormOcupnts.CommandText = "insert into dormOccupants_tbl (dorm_id, room_id, roomNumber, student_id, studentName) " +
                         "values(@dormID, @roomID, @roomNumber, @student_id, @studentName)";
                    InsertDataDormOcupnts.Parameters.AddWithValue("@dormID", dormOccupantsTBL.dorm_ID);
                    InsertDataDormOcupnts.Parameters.AddWithValue("@roomID", dormOccupantsTBL.room_ID);
                    InsertDataDormOcupnts.Parameters.AddWithValue("@roomNumber", dormOccupantsTBL.roomNumber);
                    InsertDataDormOcupnts.Parameters.AddWithValue("@student_id", dormOccupantsTBL.student_id);
                    InsertDataDormOcupnts.Parameters.AddWithValue("@studentName", dormOccupantsTBL.studentName);
                    InsertDataDormOcupnts.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    return new Response { Status = "Invalid Response", Message = e.Message };
                }
            }

            //  Get currentOccupants value in room_tbl

            using (MySqlConnection conn3 = GetConnection())
            {
                int nCurrentOccupants = 0;
                try
                {
                    conn3.Open();
                    MySqlCommand FndCurrentOcupntsInRm = conn3.CreateCommand();
                    FndCurrentOcupntsInRm.CommandText = "select currentOccupants from room_tbl where dorm_id = @dormid and room_id = @roomid and roomNumber = @roomNumber";
                    FndCurrentOcupntsInRm.Parameters.AddWithValue("dormid", dormOccupantsTBL.dorm_ID);
                    FndCurrentOcupntsInRm.Parameters.AddWithValue("roomid", dormOccupantsTBL.room_ID);
                    FndCurrentOcupntsInRm.Parameters.AddWithValue("roomNumber", dormOccupantsTBL.roomNumber);

                    // Execute the SQL command against the DB:
                    MySqlDataReader reader = FndCurrentOcupntsInRm.ExecuteReader();

                    while (reader.Read())
                    {
                        nCurrentOccupants = (int)reader[0];
                    }
                    reader.Close();
                }
                catch (Exception e)
                {
                    return new Response { Status = "Invalid Response", Message = e.Message };
                }

                // Update the currentOccupants field in room_tbl
                using (MySqlConnection conn2 = GetConnection())
                {
                    try
                    {
                        conn2.Open();
                        MySqlCommand UpdateRoomOccupntsField = conn2.CreateCommand();
                        UpdateRoomOccupntsField.CommandText = "update room_tbl set currentOccupants = @currentOccupants " +
                            "where room_id = @roomid and dorm_id = @dormid and roomNumber = @roomNumber";
                        UpdateRoomOccupntsField.Parameters.AddWithValue("@currentOccupants", nCurrentOccupants + 1 + dormOccupantsTBL.numRoommates);
                        UpdateRoomOccupntsField.Parameters.AddWithValue("@dormid", dormOccupantsTBL.dorm_ID);
                        UpdateRoomOccupntsField.Parameters.AddWithValue("@roomid", dormOccupantsTBL.room_ID);
                        UpdateRoomOccupntsField.Parameters.AddWithValue("@roomNumber", dormOccupantsTBL.roomNumber);

                        UpdateRoomOccupntsField.ExecuteNonQuery();
                    }
                    catch (Exception e)
                    {
                        return new Response { Status = "Invalid Response", Message = e.Message };
                    }
                }
            }

            return new Response { Status = "Successful", Message = "Your selection has been saved. Please stick around for the next steps." };
        }
    }
}
