using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
using MySql.Data;
using Microsoft.EntityFrameworkCore;

namespace WebAPI
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{

			services.AddControllers();

			//services.AddDbContext<HousingDBContext>(options => 
			//options.usemysql)
			//	services.AddDbContext<HousingDBContext>(options =>
			//	options.UseMySql(Configuration.GetConnectionString("DevConnection")));
			//services.Add(new ServiceDescriptor(typeof(HousingDBContext), new HousingDBContext(Configuration.GetConnectionString("DevConnection"))));

			// Replace with your connection string.
			var connectionString = Configuration.GetConnectionString("DevConnection");

			// Replace with your server version and type.
			// Use 'MariaDbServerVersion' for MariaDB.
			// Alternatively, use 'ServerVersion.AutoDetect(connectionString)'.
			// For common usages, see pull request #1233.
			var serverVersion = new MySqlServerVersion(new Version(8, 0, 25));

			// Replace 'YourDbContext' with the name of your own DbContext derived class.
			services.AddDbContext<HousingDBContext>(
				dbContextOptions => dbContextOptions
					.UseMySql(connectionString, serverVersion)
			);


///*
			services.AddCors(c =>
			{
				c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
			});

/*
			services.AddCors(c =>
			{
				c.AddPolicy("AllowOrigin", options => options.WithOrigins("https://localhost:44323"));
			});
*/


			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPI", Version = "v1" });
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
/*
			app.UseCors(builder => builder
				.AllowAnyOrigin()
				.AllowAnyMethod()
				.AllowAnyHeader()
				.AllowCredentials());
*/

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI v1"));
			}


		/*	// global cors policy
			app.UseCors(x => x
				.AllowAnyMethod()
				.AllowAnyHeader()
				.SetIsOriginAllowed(origin => true) // allow any origin
				.AllowCredentials()); // allow credentials
		*/

			app.UseRouting();

			//app.UseHttpMethodOverride();
			app.UseCors(builder => builder
				.AllowAnyOrigin()
				.AllowAnyMethod()
				.AllowAnyHeader());
				//.AllowCredentials());

			//app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});


		}
	}
}
