using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models
{
	// List of tables in the MyHousingDirector MySQL database
	public class HousingDBContext : DbContext
	{
		public HousingDBContext(DbContextOptions<HousingDBContext> options) : base(options)
		{
		}

		public DbSet<studentTblFields> student_tbl { get; set; }
		public DbSet<Admin> admin_tbl { get; set; }
	}
}
