using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class AdminDashboardInfo
    {
        private int nTotalStudentsOnCampus = 0;
        private int nTotalDormRequests = 0;
        private int nMostPopularBuildins = 0;
        private List<string> availableDormRooms = new List<string>();

        // Also need a way to get how many students there are in each dorm, such as Monadnock, Washington, etc.
    }
}
