﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
	public class DormBuilding
	{
        public string dorm_id { get; set; }

        public string name { get; set; }

        public string description { get; set; }
        
        public string url { get; set; }
    }
}