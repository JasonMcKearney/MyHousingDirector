using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
	public class GetRoomInfoDormSelection
	{
		public string dorm_id { get; set; }

		public int floorNumber { get; set; }
		public int numRoommates { get; set; }
	}
}
