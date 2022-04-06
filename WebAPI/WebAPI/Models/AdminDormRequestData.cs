
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class AdminDormRequestData
    {

        /*      select record_ID, dorm_ID, room_ID, roomNumber, studentName, submissionState from housingdirector_schema.dormOccupants_tbl;

              select b.name, r.floorNumber from Building_tbl b cross join room_tbl r on b.dorm_id = 2 and r.room_id = 4;
              washington   3
      */
        public string request_ID { get; set; }
        public string buildingName { get; set; }
        public string roomNumber { get; set; }
        public string studentName { get; set; }
        public string submissionState { get; set; }
        public Response message { get; set; }
    }
}
