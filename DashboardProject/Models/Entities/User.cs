namespace DashboardProject.Models.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Contact { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        public bool IsSystem { get; set; }

        public Guid UserTypeId { get; set; }

        public UserType UserType { get; set; } = null!;

        public Guid? CreatedByUserId { get; set; }

        public DateTime CreatedOn { get; set; }

        public ICollection<UserDashboard> UserDashboards { get; set; } = new List<UserDashboard>();

    }
}
