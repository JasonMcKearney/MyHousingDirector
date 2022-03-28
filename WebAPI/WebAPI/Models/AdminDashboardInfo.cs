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
        public string sPopularBuilding { get; set; }

        // available dorm rooms
        public List<DormBuilding> availableBuildingsList { get; set; }

        // maximum number of students in each building
        public List<DormBuilding> totalStdntsInBuildingsList { get; set; }

        public int numberDormRoomsOpen { get; set; }

        public List<Response> message { get; set; }
    }
}
