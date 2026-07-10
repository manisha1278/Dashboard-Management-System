namespace DashboardProject.Models
{
    public class UpdateUserDto
    {
        public string Username { get; set; } = string.Empty;

        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Contact { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        public Guid UserTypeId { get; set; }
    }
}