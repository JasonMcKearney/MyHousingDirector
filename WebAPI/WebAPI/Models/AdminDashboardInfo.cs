using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class AdminDashboardInfo
    {
        // total students on campus
        public int nTotalStudents { get; set; }

        // total dorm requests
        public int nTotalDormRqsts { get; set; }

        // most popular Building on Campus
        public int nPopularBuilding { get; set; }

        // available dorm rooms
        public List<string> roomInBuildingList { get; set; }

        // maximum number of students in each building
        public List<DormBuilding> totalStdntsInBuildings { get; set; }

        public List<Response> message { get; set; }
    }
}
