using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    // Keeps track of student_tbl fields
	public class studentTblFields
	{
        [Key]
        public int user_id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string confirmpassword { get; set; }
        public string verificationCode { get; set; }
        public string gender { get; set; }
        public string year { get; set; }
        public string studentID { get; set; }
    }
}