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
using WebAPI.Models.EmailServices;
using WebAPI.Models.EmailSettings;

namespace WebAPI
{
	public class Startup
	{
		private readonly IConfiguration _configuration;

		public Startup(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddTransient<IMailService, MailService>();
			services.Configure<MailSettings>(_configuration.GetSection("MailSettings"));
			services.AddControllers();

			// Replace with your connection string.
			var connectionString = _configuration.GetConnectionString("DevConnection");

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
				c.AddPolicy("AllowAll", builder => builder.AllowAnyOrigin()
										.AllowAnyHeader()
										.AllowAnyMethod());
			});

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPI", Version = "v1" });
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI v1"));
			}

			app.UseRouting();

			//app.UseHttpMethodOverride();
			app.UseCors(builder => builder
				.AllowAnyOrigin()
				.AllowAnyMethod()
				.AllowAnyHeader());

			//app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
