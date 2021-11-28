using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
	// Status and Message strings get set after running a query, returns to React if successfull or failed
	public class Response
	{
		public string Status { get; set; }
		public string Message { get; set; }
	}
}
