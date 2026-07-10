namespace DashboardProject.Models
    {
        public class UserDashboardDto
        {
            public Guid DashboardId { get; set; }

            public string DashboardName { get; set; } = string.Empty;

            public bool IsAssigned { get; set; }
        }
    }


