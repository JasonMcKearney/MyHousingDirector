using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly HousingDBContext _context;

        private IConfiguration _configuration;

        private MySqlConnection GetConnection()
        {
              string myConnectionString = _configuration.GetConnectionString("DevConnection"); //Configuration.GetConnectionString("DevConnection");
            return new MySqlConnection(myConnectionString);
     //       throw new NotImplementedException();
        }

        public StudentController(HousingDBContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/DStudent
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentsViewModel>>> GetDBUserTbls()
        {
            return await _context.DBUserTbls.ToListAsync();
        }

        // GET: api/DStudent/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentsViewModel>> GetDStudents(int id)
        {
            var dStudents = await _context.DBUserTbls.FindAsync(id);

            if (dStudents == null)
            {
                return NotFound();
            }

            return dStudents;
        }

        // PUT: api/DStudent/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDStudents(int id, StudentsViewModel dStudents)
        {
            /* if (id != dStudents.user_id)
             {
                 return BadRequest();
             }
            */
            dStudents.user_id = id;

            _context.Entry(dStudents).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DStudentsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DStudent
        [HttpPost]
        public StudentsViewModel GetStudentInfo(StudentsViewModel check)
        {
            System.Diagnostics.Debug.WriteLine(check.username);
            string usernameResult = null;
            string studentIDResult = null;

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand getID = conn.CreateCommand();

                getID.Parameters.AddWithValue("@username", check.username);
                getID.CommandText = "select studentID, username from housingdirector_schema.DBUserTbls where username = @username";
                
                MySqlDataReader ReturnedInfo = getID.ExecuteReader();

                while (ReturnedInfo.Read())
                {
                    usernameResult = ReturnedInfo.GetString(1);
                    studentIDResult = ReturnedInfo.GetString(0);
                }
                ReturnedInfo.Close();

            }
            return new StudentsViewModel { studentID = studentIDResult, username = usernameResult };
        }

        // DELETE: api/DStudent/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDStudents(int id)
        {
            var dStudents = await _context.DBUserTbls.FindAsync(id);
            if (dStudents == null)
            {
                return NotFound();
            }

            _context.DBUserTbls.Remove(dStudents);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DStudentsExists(int id)
        {
            return _context.DBUserTbls.Any(e => e.user_id == id);
        }

        [Route("api/DStudent/Login")]
        [HttpPost]
        public Response StudentLogin(Login login)
        {

            var log = _context.DBUserTbls.Where(x => x.username.Equals(login.username) &&
                      x.password.Equals(login.password)).FirstOrDefault();

            if (log == null)
            {
                return new Response { Status = "Invalid", Message = "Invalid User." };
            }
            else
                return new Response { Status = "Success", Message = "Login Successfully" };
        }
    }
}
