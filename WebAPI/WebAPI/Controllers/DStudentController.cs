using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DStudentController : ControllerBase
    {
        private readonly HousingDBContext _context;

        public DStudentController(HousingDBContext context)
        {
            _context = context;
        }

        // GET: api/DStudent
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DStudents>>> GetDBUserTbls()
        {
            return await _context.DBUserTbls.ToListAsync();
        }

        // GET: api/DStudent/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DStudents>> GetDStudents(int id)
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
        public async Task<IActionResult> PutDStudents(int id, DStudents dStudents)
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
        public async Task<ActionResult<DStudents>> PostDStudents(DStudents dStudents)
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
    }
}
