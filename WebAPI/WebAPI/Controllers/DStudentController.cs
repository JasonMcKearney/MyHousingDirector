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
    public class DStudentController : ControllerBase
    {
        private readonly HousingDBContext _context;

//        public string ConnectionString { get; set; }


        private IConfiguration _configuration;

        private MySqlConnection GetConnection()
        {
              string myConnectionString = _configuration.GetConnectionString("DevConnection"); //Configuration.GetConnectionString("DevConnection");
            return new MySqlConnection(myConnectionString);
     //       throw new NotImplementedException();
        }

        public DStudentController(HousingDBContext context, IConfiguration configuration)
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
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StudentsViewModel>> PostDStudents(StudentsViewModel dStudents)
        {
            _context.DBUserTbls.Add(dStudents);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDStudents", new { id = dStudents.user_id }, dStudents);
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

        /*        [Route("StudentExists")]
                public object CheckStudentDetails(string user_name)
                {
                    var obj = _context.DBUserTbls.Where(e => e.username == user_name).ToList().FirstOrDefault();
                    return new Response
                    {
                        Status = "test",
                        Message = "test Successfuly"
                    };
                }
        */


        [Route("api/DStudent/Login")]
        [HttpPost]
        public Response StudentLogin(Login login)
        {
            System.Diagnostics.Debug.WriteLine(login.username);
            System.Diagnostics.Debug.WriteLine(login.password);

            var log = _context.DBUserTbls.Where(x => x.username.Equals(login.username) &&
                      x.password.Equals(login.password)).FirstOrDefault();

            if (log == null)
            {
                return new Response { Status = "Invalid", Message = "Invalid User." };
            }
            else
                return new Response { Status = "Success", Message = "Login Successfully" };
        }

        [Route("AddStudent")]
        [HttpPost]
        public Response AddStudent(StudentsViewModel student)
        {           
            bool bSuccessfull = true;
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand CheckUser = conn.CreateCommand();

                // Checks to see if there are duplicate usernames
                CheckUser.Parameters.AddWithValue("@username", student.username);
                CheckUser.CommandText = "select count(*) from housingdirector_schema.DBUserTbls where userName = @userName";

                // if 1 then already exist
                int UserExist = Convert.ToInt32(CheckUser.ExecuteScalar());

                if (UserExist >= 1)
                {
                    bSuccessfull = false;
                    return new Response { Status = "User Exists", Message = "Cannot" };
                }
                else
                {
                    //   // Hash password
                    //   uc.password = BCrypt.Net.BCrypt.HashPassword(uc.password);
                    //   uc.confirmPassword = BCrypt.Net.BCrypt.HashPassword(uc.confirmPassword);

                    // Inserting data into fields of database
                    MySqlCommand Query = conn.CreateCommand();
                    Query.CommandText = "insert into housingdirector_schema.DBUserTbls (username, email, password, confirmpassword, gender, year, studentID) VALUES (@username, @email, @password, @confirmpassword, @gender, @year, @studentID)";
                    Query.Parameters.AddWithValue("@username", student.username);
                    Query.Parameters.AddWithValue("@email", student.email);
                    Query.Parameters.AddWithValue("@password", student.password);
                    Query.Parameters.AddWithValue("@confirmpassword", student.confirmpassword);
                    Query.Parameters.AddWithValue("@gender", student.gender);
                    Query.Parameters.AddWithValue("@year", student.year);
                    Query.Parameters.AddWithValue("@studentID", student.studentID);

                    Query.ExecuteNonQuery();
                }
            }

            if(!bSuccessfull)
			{
                return new Response { Status = "Invalid", Message = "Cannot" };
            }

            return new Response { Status = "Success", Message = "Login Successfully" };
        }
    }
}
