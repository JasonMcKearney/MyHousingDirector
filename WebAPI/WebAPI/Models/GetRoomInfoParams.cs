using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
	public class GetRoomInfoParams
	{
		public string dorm_id { get; set; }

		public string floorNumber { get; set; }
	}
}
