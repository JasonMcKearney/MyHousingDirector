using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class RoommateReturnObject
    {
        public int requestID { get; set; }
        public string studentFirstName { get; set; }
        public string studentLastName { get; set; }
        public string studentEmail { get; set; }
        public string requestState { get; set; }

    }
}

