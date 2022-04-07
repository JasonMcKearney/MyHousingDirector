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
            string myConnectionString = _configuration.GetConnectionString("DevConnection");
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
            string useryearResult = null;
            string usergenderResult = null;


            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand getID = conn.CreateCommand();

                getID.Parameters.AddWithValue("@username", check.username);

                getID.CommandText = "select studentID, username, firstName, lastName, email, user_id, year, gender from housingdirector_schema.student_tbl where username = @username";

                MySqlDataReader ReturnedInfo = getID.ExecuteReader();

                while (ReturnedInfo.Read())
                {
                    studentIDResult = ReturnedInfo.GetString(0);
                    usernameResult = ReturnedInfo.GetString(1);
                    firstNameResult = ReturnedInfo.GetString(2);
                    lastNameResult = ReturnedInfo.GetString(3);
                    emailResult = ReturnedInfo.GetString(4);
                    useridResult = ReturnedInfo.GetString(5);
                    useryearResult = ReturnedInfo.GetString(6);
                    usergenderResult = ReturnedInfo.GetString(7);
                }
                ReturnedInfo.Close();

            }
            return new studentTblFields { user_id = Int32.Parse(useridResult), studentID = studentIDResult, username = usernameResult, firstName = firstNameResult, lastName = lastNameResult, email = emailResult, year = useryearResult, gender = usergenderResult, };
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

        [Route("DeleteRoommate/{requestID}")]
        [HttpPost]
        public Response DeleteRoommate(RoommateReturnObject request)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                int requestID = Convert.ToInt32(request.requestID);

                MySqlCommand Remove = conn.CreateCommand();
                Remove.Parameters.AddWithValue("@requestID", requestID);
                Remove.CommandText = "select count(*) from housingdirector_schema.roommates_table where id = @requestID";

                int requestExists = Convert.ToInt32(Remove.ExecuteScalar());

                if (requestExists >= 1)
                {
                    MySqlCommand DeleteEntry = conn.CreateCommand();
                    DeleteEntry.Parameters.AddWithValue("@requestID", requestID);
                    DeleteEntry.CommandText = "DELETE from housingdirector_schema.roommates_table where id = @requestID";
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
                MySqlCommand Add = conn.CreateCommand();
                Add.Parameters.AddWithValue("@requestorID", requestor_id);
                Add.Parameters.AddWithValue("@recieverID", ids.reciever_id);
                Add.CommandText = "select count(*) from housingdirector_schema.roommates_table where Requestor_ID = @requestorID AND roommate_ID = @recieverID";

                int requestExists = Convert.ToInt32(Add.ExecuteScalar());

                if (requestExists >= 1)
                {
                    return new Response { Status = "Request exists", Message = "Already requested that student" };
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

        [Route("ApproveRoommate/{requestID}")]
        [HttpPost]
        public Response ApproveRoommate(RoommateReturnObject request)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                int requestID = Convert.ToInt32(request.requestID);

                MySqlCommand Approve = conn.CreateCommand();
                Approve.Parameters.AddWithValue("@requestID", requestID);
                Approve.CommandText = "select count(*) from housingdirector_schema.roommates_table where id = @requestID";

                int requestExists = Convert.ToInt32(Approve.ExecuteScalar());

                if (requestExists >= 1)
                {
                    MySqlCommand DeleteEntry = conn.CreateCommand();
                    DeleteEntry.Parameters.AddWithValue("@requestID", requestID);
                    DeleteEntry.CommandText = "UPDATE housingdirector_schema.roommates_table SET RequestState = \"accepted\"  WHERE id = @requestID";
                    DeleteEntry.ExecuteNonQuery();
                    return new Response { Status = "Approval successful", Message = "Approved matching entry" };

                }
                else
                {
                    return new Response { Status = "No matching entry", Message = "There is no entry matching the parameters" };
                }

            }
        }

        [Route("DeclineRoommate/{requestID}")]
        [HttpPost]
        public Response DeclineRoommate(RoommateReturnObject request)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                int requestID = Convert.ToInt32(request.requestID);

                MySqlCommand Decline = conn.CreateCommand();
                Decline.Parameters.AddWithValue("@requestID", requestID);
                Decline.CommandText = "select count(*) from housingdirector_schema.roommates_table where id = @requestID";

                int requestExists = Convert.ToInt32(Decline.ExecuteScalar());

                if (requestExists >= 1)
                {
                    MySqlCommand DeleteEntry = conn.CreateCommand();
                    DeleteEntry.Parameters.AddWithValue("@requestID", requestID);
                    DeleteEntry.CommandText = "UPDATE housingdirector_schema.roommates_table SET RequestState = \"declined\"  WHERE id = @requestID";
                    DeleteEntry.ExecuteNonQuery();
                    return new Response { Status = "Decline successful", Message = "Declined matching entry" };

                }
                else
                {
                    return new Response { Status = "No matching entry", Message = "There is no entry matching the parameters" };
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

                FindBuildingInfo.CommandText = "SELECT Building_tbl.dorm_id, Building_tbl.name, Building_Description_tbl.Description_Text,Building_Image_tbl.Image_Link FROM Building_tbl INNER JOIN Building_Image_tbl on Building_Image_tbl.Image_ID_Building_ID = Building_tbl.dorm_id INNER JOIN Building_Description_tbl on Building_Description_tbl.Dorm_ID = Building_tbl.dorm_id";


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
                        image1 = reader[3].ToString()

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
                FindFloorInfo.Parameters.AddWithValue("@numRoommates", floorDetails.numRoommates + 1);

                //FindFloorInfo.CommandText = "select floorNumber from housingdirector_schema.room_tbl where dorm_id = @dorm_id";

                // Select the floor number based upon the building, room size, maxOccupants = num_roommates + 1
                FindFloorInfo.CommandText = "select Floor_tbl.floorNumber, Floor_tbl.floor_id, FloorDescription_tbl.floorDescription FROM Floor_tbl INNER JOIN FloorDescription_tbl ON Floor_tbl.floor_id = FloorDescription_tbl.Floor_tbl_Floor_Description WHERE Floor_tbl_Building_tbl = @dorm_id;";

                FindFloorInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindFloorInfo.ExecuteReader();

                while (reader.Read())
                {
                    floorNumsForBuilding.Add(new FloorInfoDormSelection()
                    {
                        floorID = reader.GetInt32(1),
                        floorNumber = reader[0].ToString(),
                        floorDescription = reader[2].ToString(),

                    }) ;
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

                FindRoomInfo.CommandText = "SELECT room_tbl.room_id, room_tbl.roomNumber, room_tbl.maxOccupants, Room_Decription_tbl.description_id, Room_Decription_tbl.room_description FROM room_tbl INNER JOIN Room_Decription_tbl  on room_tbl.room_id =  Room_Decription_tbl.room_description_id WHERE floorID = @floorNumber AND building_id = @dorm_id;";
                FindRoomInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindRoomInfo.ExecuteReader();

                while (reader.Read())
                {
                    roomList.Add(new RoomTblFields()
                    {
                        room_id = reader[0].ToString(),
                        roomNumber = reader[1].ToString(),
                       roomDescription = reader[4].ToString(),
                        maxOccupants = reader[2].ToString(),
                        
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
                    occupants.Add(new studentTblFields()
                    {
                        studentID = reader.GetString(5),
                        firstName = reader.GetString(1),
                        lastName = reader.GetString(2),
                        username = reader.GetString(3),
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
                    InsertDataDormOcupnts.CommandText = "insert into dormOccupants_tbl (dorm_id, room_id, roomNumber, student_id, studentName, submissionState) " +
                         "values(@dormID, @roomID, @roomNumber, @student_id, @studentName, @submissionState)";
                    InsertDataDormOcupnts.Parameters.AddWithValue("@dormID", dormOccupantsTBL.dorm_ID);
                    InsertDataDormOcupnts.Parameters.AddWithValue("@roomID", dormOccupantsTBL.room_ID);
                    InsertDataDormOcupnts.Parameters.AddWithValue("@roomNumber", dormOccupantsTBL.roomNumber);
                    InsertDataDormOcupnts.Parameters.AddWithValue("@student_id", dormOccupantsTBL.student_id);
                    InsertDataDormOcupnts.Parameters.AddWithValue("@studentName", dormOccupantsTBL.studentName);
                    InsertDataDormOcupnts.Parameters.AddWithValue("@submissionState", "requested");
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
                        UpdateRoomOccupntsField.Parameters.AddWithValue("@currentOccupants", nCurrentOccupants + 1);
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
        [Route("GetOutboundRequests/{studentID}")]
        [HttpPost]
        public List<RoommateReturnObject> GetPendingOutboundRequests(int studentID)
        {
            List<RoommateReturnObject> occupants = new List<RoommateReturnObject>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand FindRoomInfo = conn.CreateCommand();

                FindRoomInfo.Parameters.AddWithValue("@studentID", studentID);

                FindRoomInfo.CommandText =
                    "USE housingdirector_schema; SELECT roommates_table.id, student_tbl.firstName, student_tbl.lastName," +
                    " student_tbl.email,  roommates_table.RequestState " +
                    " FROM roommates_table" +
                    " INNER JOIN student_tbl ON student_tbl.user_id = roommates_table.roommate_ID" +
                    " WHERE Requestor_ID = @studentID;";

                FindRoomInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindRoomInfo.ExecuteReader();

                while (reader.Read())
                {
                    occupants.Add(new RoommateReturnObject()
                    {
                        requestID = reader.GetInt32(0),
                        studentFirstName = reader.GetString(1),
                        studentLastName = reader.GetString(2),
                        studentEmail = reader.GetString(3),
                        requestState = reader.GetString(4)
                    });
                    ;
                }
                reader.Close();
            }
            return occupants;
        }
        [Route("GetInboundRequests/{studentID}")]
        [HttpPost]
        public List<RoommateReturnObject> GetPendingInboundRequests(int studentID)
        {
            List<RoommateReturnObject> occupants = new List<RoommateReturnObject>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand FindRoomInfo = conn.CreateCommand();

                FindRoomInfo.Parameters.AddWithValue("@studentID", studentID);

                FindRoomInfo.CommandText =
                    "USE housingdirector_schema; SELECT roommates_table.id, student_tbl.firstName, student_tbl.lastName," +
                    " student_tbl.email, roommates_table.RequestState " +
                    " FROM roommates_table" +
                    " INNER JOIN student_tbl ON student_tbl.user_id = roommates_table.Requestor_ID" +
                    " WHERE roommate_ID = @studentID;";

                FindRoomInfo.ExecuteNonQuery();

                // Execute the SQL command against the DB:
                MySqlDataReader reader = FindRoomInfo.ExecuteReader();

                while (reader.Read())
                {
                    occupants.Add(new RoommateReturnObject()
                    {
                        requestID = reader.GetInt32(0),
                        studentFirstName = reader.GetString(1),
                        studentLastName = reader.GetString(2),
                        studentEmail = reader.GetString(3),
                        requestState = reader.GetString(4)
                    });
                }
                reader.Close();
            }
            return occupants;
        }

        [Route("submitSurveyQuestions")]
        [HttpPost]
        public Response submitSurveyQuestions(SurveyQuestions newSurvey)
        {
            bool surveyExsists = false;
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand surveyQuestions = conn.CreateCommand();
                surveyQuestions.Parameters.AddWithValue("@userID", newSurvey.userID);
                surveyQuestions.CommandText = "SELECT survey_userid From survey WHERE survey_userid = @userID";
                surveyQuestions.ExecuteNonQuery();


                MySqlDataReader reader = surveyQuestions.ExecuteReader();

                while (reader.Read())
                {
                    surveyExsists = true;
                }
                reader.Close();

                surveyQuestions.Parameters.AddWithValue("@Question1", newSurvey.Question1);
                surveyQuestions.Parameters.AddWithValue("@Question2", newSurvey.Question2);
                surveyQuestions.Parameters.AddWithValue("@Question3", newSurvey.Question3);
                surveyQuestions.Parameters.AddWithValue("@Question4", newSurvey.Question4);
                surveyQuestions.Parameters.AddWithValue("@Question5", newSurvey.Question5);
                surveyQuestions.Parameters.AddWithValue("@Question6", newSurvey.Question6);
                surveyQuestions.Parameters.AddWithValue("@Question7", newSurvey.Question7);
                surveyQuestions.Parameters.AddWithValue("@Question8", newSurvey.Question8);
                surveyQuestions.Parameters.AddWithValue("@Question9", newSurvey.Question9);
                surveyQuestions.Parameters.AddWithValue("@Question10", newSurvey.Question10);
                surveyQuestions.Parameters.AddWithValue("@Question11", newSurvey.Question11);
                surveyQuestions.Parameters.AddWithValue("@Question12", newSurvey.Question12);

                if (surveyExsists == true)
                {


                    surveyQuestions.CommandText = "UPDATE survey SET Question1 = @Question1, Question2 = @Question2, Question3 = @Question3," +
                                                   "Question4 = @Question4, Question5 = @Question5, Question6 = @Question6, Question7 = @Question7," +
                                                   "Question8 = @Question8, Question9 = @Question9, Question10 = @Question10, Question11 = @Question11," +
                                                   "Question12 = @Question12 WHERE survey_userid = @userID;";

                }
                else
                {
                    surveyQuestions.CommandText = "INSERT INTO survey (Question1,  Question2,Question3,Question4,Question5,Question6,Question7,Question8,Question9,Question10,Question11,Question12,survey_userid )" +
                                                  "VALUES (@Question1,@Question2,@Question3,@Question4, @Question5,@Question6,@Question7,@Question8, @Question9, @Question10,@Question11,@Question12,@userID);";

                }

                surveyQuestions.ExecuteNonQuery();
            }
            return new Response { Status = "Successful", Message = "The questions have been recieved" };
        }


        [Route("getCurrentSurveyQuestions/{userID}")]
        [HttpPost]
        public SurveyQuestions getCurrentSurveyQuestions(int userID)
        {

            SurveyQuestions currentSurvey = new SurveyQuestions();
            bool surveyExsists = false;
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand surveyQuestions = conn.CreateCommand();
                surveyQuestions.Parameters.AddWithValue("@userID", userID);
                surveyQuestions.CommandText = "SELECT * From survey WHERE survey_userid = @userID";
                surveyQuestions.ExecuteNonQuery();


                MySqlDataReader reader = surveyQuestions.ExecuteReader();

                while (reader.Read())
                {
                    currentSurvey.Question1 = reader[1].ToString();
                    currentSurvey.Question2 = reader[2].ToString();
                    currentSurvey.Question3 = reader[3].ToString();
                    currentSurvey.Question4 = reader[4].ToString();
                    currentSurvey.Question5 = reader[5].ToString();
                    currentSurvey.Question6 = reader[6].ToString();
                    currentSurvey.Question7 = reader[7].ToString();
                    currentSurvey.Question8 = reader[8].ToString();
                    currentSurvey.Question9 = reader[9].ToString();
                    currentSurvey.Question10 = reader[10].ToString();
                    currentSurvey.Question11 = reader[11].ToString();
                    currentSurvey.Question12 = reader[12].ToString();

                    surveyExsists = true;
                }
                reader.Close();
                return currentSurvey;
            }

        }
        [Route("getRoommateRequestStates/{userID}")]
        [HttpPost]
        //Checks all request between a student and their roommates to make sure they have all requested each other.
        public List<RoommateReturnObject> getRoommateRequestStates(int userID)
        {
            List<RoommateReturnObject> requestorsRequests = new List<RoommateReturnObject>();
            List<RoommateReturnObject> RoomateRequestState = new List<RoommateReturnObject>();
            bool requestWasFound = false;

            using (MySqlConnection conn = GetConnection())
            {
                int userRequestCount;
                conn.Open();

                //First gets all the First names,ids, and las names of all the recievers of users requests
                MySqlCommand requestorID = conn.CreateCommand();
                requestorID.Parameters.AddWithValue("@userID", userID);
                requestorID.CommandText = "Select roommates_table.Requestor_ID, roommates_table.roommate_ID, roommates_table.RequestState, student_tbl.firstName, student_tbl.lastName FROM roommates_table INNER JOIN student_tbl ON roommates_table.roommate_ID = student_tbl.user_id WHERE Requestor_ID = @userID;";

                requestorID.ExecuteNonQuery();


                MySqlDataReader reader = requestorID.ExecuteReader();

                while (reader.Read())
                {

                    requestorsRequests.Add(new RoommateReturnObject()
                    {
                        recieverID = reader.GetInt32(1),
                        studentFirstName = reader[3].ToString(),
                        studentLastName = reader[4].ToString(),
                        requestState = reader[2].ToString()

                    }) ;
                }
                reader.Close();
                 userRequestCount = requestorsRequests.Count();
                //goes one reciever at a time and check if they hace requested any of the recievers that the user has requester
                    for (int i = 0; i < userRequestCount; i++)
                    {

                    
                    //finds all the reqest that this reviever has made
                        for (int c = 0; c < userRequestCount; c++)
                        {
                            requestWasFound = false;
                                requestorID = conn.CreateCommand();
                                requestorID.Parameters.AddWithValue("@requestorID", requestorsRequests[i].recieverID.ToString());
                                requestorID.CommandText = "SELECT roommates_table.roommate_ID, roommates_table.Requestor_ID, student_tbl.firstName, student_tbl.lastName, roommates_table.RequestState FROM roommates_table INNER JOIN student_tbl ON roommates_table.Requestor_ID = student_tbl.user_id WHERE Requestor_ID = @requestorID;";
                                requestorID.ExecuteNonQuery();
                   
                                reader = requestorID.ExecuteReader();

                            while (reader.Read())
                            {
                        
                                int comparedValue = reader.GetInt32(0);

                                if (comparedValue == requestorsRequests[c].recieverID )
                                {
                                    if (reader[4].ToString() != "accepted")
                                    {


                                        RoomateRequestState.Add(new RoommateReturnObject()
                                        {
                                            studentFirstName = reader[2].ToString(),
                                            studentLastName = reader[3].ToString(),
                                            requestState = reader[4].ToString(),
                                            requestorFirstName = requestorsRequests[c].studentFirstName,
                                            requestorLastName = requestorsRequests[c].studentLastName,

                                        });


                                    }
                                    requestWasFound = true;
                                }
                    

                            }
                                if(!requestWasFound && requestorsRequests[i].recieverID != requestorsRequests[c].recieverID)
                                {
                                    RoomateRequestState.Add(new RoommateReturnObject()
                                    {
                                        studentFirstName = requestorsRequests[i].studentFirstName,
                                        studentLastName = requestorsRequests[i].studentLastName,
                                        requestState = "Has not requested",
                                        requestorFirstName = requestorsRequests[c].studentFirstName,
                                        requestorLastName = requestorsRequests[c].studentLastName,

                                    });
                            
                                }
                                reader.Close();
                        }
                    
                    }
               
            }
            return RoomateRequestState;
        }

        [Route("getStudentDormRequests/{studentID}")]
        [HttpGet]
        public List<AdminDormRequestData> GetStudentDormRequests(string studentID)
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
                    GetRequestData.CommandText = "select request_ID, dorm_ID, room_ID from housingdirector_schema.dormOccupants_tbl where student_id = @student_id";
                    GetRequestData.Parameters.AddWithValue("@student_id", studentID);
                    GetRequestData.ExecuteNonQuery();

                    // Execute the SQL command against the DB:
                    MySqlDataReader reader = GetRequestData.ExecuteReader();
                    while (reader.Read())
                    {
                        // Populate tempIDList with ids that are used to figure out name of building, room
                        tempIDList.Add(new TempIDsStruct
                        {
                            request_ID = reader[0].ToString(),
                            dorm_ID = reader[1].ToString(),
                            room_ID = reader[2].ToString()
                        });
                    }
                    reader.Close();
                }
                catch (Exception e)
                {
                    //TempIDsStruct tempObject = new TempIDsStruct();
                    tempIDList.Add(new TempIDsStruct
                    {
                        message = (new Response { Status = "Invalid Response", Message = e.Message })
                    });
                }
            }
            // Open the MySql connection
            using (MySqlConnection conn2 = GetConnection())
            {
                // Find names using IDs saved inside of struct object and then save data into AdminDormRequestData class to send to React.js in JSON
                try
                {
                    conn2.Open();
                    for (int counter = 0; counter < tempIDList.Count(); counter++)
                    {
                        MySqlCommand GetRequestData2 = conn2.CreateCommand();
                        GetRequestData2.CommandText = "select b.name, d.roomNumber, d.studentName, d.submissionState from Building_tbl b " +
                            "cross join room_tbl r cross join dormOccupants_tbl d on b.dorm_id = @dormid and r.room_id = @roomid and " +
                            "d.request_ID = @requestID";
                        GetRequestData2.Parameters.AddWithValue("@requestId", tempIDList[counter].request_ID);
                        GetRequestData2.Parameters.AddWithValue("@dormid", tempIDList[counter].dorm_ID);
                        GetRequestData2.Parameters.AddWithValue("@roomid", tempIDList[counter].room_ID);
                        GetRequestData2.ExecuteNonQuery();

                        // Execute the SQL command against the DB:
                        MySqlDataReader reader = GetRequestData2.ExecuteReader();
                        while (reader.Read())
                        {
                            // Save values into AdminDormRequestData class so can pass list to React JS to retrieve and manipulate the data
                            requestDataList.Add(new AdminDormRequestData
                            {
                                request_ID = tempIDList[counter].request_ID,
                                buildingName = reader[0].ToString(),
                                roomNumber = reader[1].ToString(),
                                studentName = reader[2].ToString(),
                                submissionState = reader[3].ToString()
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

        struct TempIDsStruct
        {
            public string request_ID;
            public string dorm_ID;
            public string room_ID;
            public Response message;
        }
    }
}
