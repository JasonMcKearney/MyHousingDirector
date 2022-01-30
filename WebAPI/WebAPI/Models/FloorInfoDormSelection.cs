using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
	public class FloorInfoDormSelection
	{
		public string floorNumber { get; set; }

		// Not in Database table, but used to narrow down the search for floor number
		public int dorm_id { get; set; }
		public int numRoommates { get; set; }

	}
}
