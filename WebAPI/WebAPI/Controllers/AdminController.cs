using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
	[Route("api/[controller]")]
	[EnableCors("AllowAll")]
	[ApiController]
	public class AdminController : ControllerBase
	{
        private readonly HousingDBContext _context;

        public AdminController(HousingDBContext context)
        {
            _context = context;
        }

        // Will pull username and password from DB and check if that is what user typed in
        // Bring them to the corresponding page Student or Admin home page
        [Route("Login")]
        [HttpPost]
        public Response AdminLogin(Login login)
        {
            System.Diagnostics.Debug.WriteLine(login.username);
            System.Diagnostics.Debug.WriteLine(login.password);

            var log = _context.admin_tbl.Where(x => x.username.Equals(login.username) &&
                      x.password.Equals(login.password)).FirstOrDefault();

            if (log == null)
            {
                return new Response { Status = "Invalid", Message = "Invalid User." };
            }
            else
                return new Response { Status = "Success", Message = "Login Successfully" };
        }

        // Create student account


        //[Route("Search")]
    }
}
