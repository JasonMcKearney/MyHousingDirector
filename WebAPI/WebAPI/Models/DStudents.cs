using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
	public class DStudents
	{
        [Key]
        public int user_id { get; set; }
        [Column(TypeName = "nvarchar(64)")]
        public string firstName { get; set; }

        [Column(TypeName = "nvarchar(64)")]
        public string lastName { get; set; }

        [Column(TypeName = "nvarchar(64)")]
        public string username { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string email { get; set; }

        [Column(TypeName = "nvarchar(64)")]
        public string password { get; set; }

        [Column(TypeName = "nvarchar(64)")]
        public string confirmpassword { get; set; }

        [Column(TypeName = "nvarchar(16)")]
        public string verificationCode { get; set; }
    }
}