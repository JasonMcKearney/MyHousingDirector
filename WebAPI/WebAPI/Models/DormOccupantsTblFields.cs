using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class DormOccupantsTblFields
    {
        public int dorm_ID { get; set; }

        public int room_ID { get; set; }

        public string roomNumber { get; set; }

        public int student_id { get; set; }
        public string studentName { get; set; }

        // Below are not related to the table, but are needed to get the ids above and to fill this table
        public int floorNumber { get; set; }
        public int numRoommates { get; set; }
    }
}
