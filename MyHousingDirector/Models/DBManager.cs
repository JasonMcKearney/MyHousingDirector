﻿using System;
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

		#endregion

	}
}
