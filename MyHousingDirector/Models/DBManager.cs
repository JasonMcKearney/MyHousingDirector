using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace MyHousingDirector.Models
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
		public bool SaveUser()
		{
			bool bRet = false;
/*			using (MySqlConnection conn = GetConnection())
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
*/
			return true;
		}
		#endregion

	}
}
