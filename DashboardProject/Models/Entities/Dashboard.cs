namespace DashboardProject.Models.Entities
{
    public class Dashboard
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public ICollection<DashboardWidget> DashboardWidgets { get; set; } = new List<DashboardWidget>();

        public ICollection<UserDashboard> UserDashboards { get; set; } = new List<UserDashboard>();
    }
}
