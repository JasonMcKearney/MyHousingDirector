using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MyHousingDirector.Controllers
{
	public class LoginDataController
	{
		public int ID { get; set; }
		public string UserName { get; set; }
		public string Password { get; set; }
	}
}
