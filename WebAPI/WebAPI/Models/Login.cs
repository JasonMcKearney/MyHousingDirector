using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
	// Login data gets set when user is trying to login to the application, Login object is used in the query to login
	public class Login
	{
		public string username { get; set; }
		public string password { get; set; }
	}
}
