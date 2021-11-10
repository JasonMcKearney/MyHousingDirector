using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models
{
	public class HousingDBContext : DbContext
	{
		public HousingDBContext(DbContextOptions<HousingDBContext> options) : base(options)
		{

		}

		public DbSet<StudentsViewModel> DBUserTbls { get; set; }
		public DbSet<Admin> admin_tbl { get; set; }
	}
}
