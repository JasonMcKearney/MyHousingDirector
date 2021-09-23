using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using MyHousingDirector.Models;
using System.Data;

namespace MyHousingDirector.Controllers
{
	public class DBManager
	{
		public string ConnectionString { get; set; }

		public DBManager(string connectionString)
		{
			this.ConnectionString = connectionString;
		}

		private MySqlConnection GetConnection()
		{
			return new MySqlConnection(ConnectionString);
		}



		#region Login/Create Account
		// Test Query...
		/*		public bool AddUser(string Name)
				{
					bool bRet = false;
								using (MySqlConnection conn = GetConnection())
								{
									// Hash password
									uc.password = BCrypt.Net.BCrypt.HashPassword(uc.password);
									uc.confirmPassword = BCrypt.Net.BCrypt.HashPassword(uc.confirmPassword);

									// Inserting data into fields of database
									MySqlCommand Query = conn.CreateCommand();
									Query.CommandText = "insert into housingdirector_schema.user_tbl (firstname, lastname, username, email, password, confirmpassword, verificationcode) VALUES (@firstname,@lastname, @username, @email, @password, @confirmpassword, @verificationcode)";
									Query.Parameters.AddWithValue("@firstname", uc.fname);
									Query.Parameters.AddWithValue("@lastname", uc.lname);
									Query.Parameters.AddWithValue("@username", uc.username);
									Query.Parameters.AddWithValue("@email", uc.email);
									Query.Parameters.AddWithValue("@password", uc.password);
									Query.Parameters.AddWithValue("@confirmpassword", uc.confirmPassword);
									Query.Parameters.AddWithValue("@verificationcode", " ");

									Query.ExecuteNonQuery();
								}

					return true;
				}
		*/
		[HttpGet]
		// Get userid from database
		public JsonResult GetUserID()
		{
			DataTable table = new DataTable();
			//int userID = -1;
			using (MySqlConnection conn = GetConnection())
			{
				conn.Open();
				MySqlCommand FindUser = conn.CreateCommand();
				int id = 1;
				FindUser.CommandText = "SELECT username, email FROM housingdirector_schema.user_tbl where user_id = id";
				// Checks to see if there are duplicate usernames
				FindUser.Parameters.AddWithValue("@user_id", id);

				// Execute the SQL command against the DB:
				MySqlDataReader reader = FindUser.ExecuteReader();
				if (reader.Read()) // Read returns false if the user does not exist!
				{
					// Read the DB values:
					Object[] values = new object[1];
					int fieldCount = reader.GetValues(values);
					if (2 == fieldCount)
					{
						table.Load(reader);
					}
				}
				reader.Close();
			}
			return new JsonResult(table);
		}
#endregion


	}
}
