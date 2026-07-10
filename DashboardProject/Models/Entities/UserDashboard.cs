namespace DashboardProject.Models.Entities
{
    public class UserDashboard
    {
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        public Guid DashboardId { get; set; }

        public Dashboard Dashboard { get; set; } = null!;
    }
}
