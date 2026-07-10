namespace DashboardProject.Models
{
    public class UserTypeDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        public bool IsSystem { get; set; }

        public DateTime CreatedOn { get; set; }

        public string CreatedBy { get; set; } = string.Empty;
    }
}
