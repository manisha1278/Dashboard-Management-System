namespace DashboardProject.Models
{
    public class UserDto
    {
        public Guid Id { get; set; }

        public string Username { get; set; } = string.Empty;

        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Contact { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        public bool IsSystem { get; set; }

        public Guid UserTypeId { get; set; }

        public string UserTypeName { get; set; } = string.Empty;

        public DateTime CreatedOn { get; set; }

        public string CreatedBy { get; set; } = string.Empty;
    }
}