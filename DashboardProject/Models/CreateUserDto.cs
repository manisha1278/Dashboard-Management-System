namespace DashboardProject.Models
{
    public class CreateUserDto
    {
        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Contact { get; set; } = string.Empty;

        public Guid UserTypeId { get; set; }
    }
}
