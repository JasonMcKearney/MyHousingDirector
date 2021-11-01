using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
	public class Admin
	{
        [Key]
        public int admin_id { get; set; }
        
        [Column(TypeName = "nvarchar(64)")]
        public string username { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string email { get; set; }

        [Column(TypeName = "nvarchar(64)")]
        public string password { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string confirmpassword { get; set; }
    }
}
