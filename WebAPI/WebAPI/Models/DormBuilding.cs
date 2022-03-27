using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
	public class DormBuilding
	{
        public string dorm_id { get; set; }

        public string name { get; set; }

        public string description { get; set; }
        
        public string url { get; set; }

        public string image1 { get; set; }
        
        public string image2 { get; set; }

        public int sizeBuilding { get; set; }

        public int numRoomsAvailable { get; set; }
    }
}
