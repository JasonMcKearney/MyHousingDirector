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
        public string requestorFirstName { get; set; }
        public string requestorLastName { get; set; }
        public int recieverID { get; set; }

    }
}

