namespace DashboardProject.Models.Entities
{
    public class UserType
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public bool IsActive { get; set; } 

        public bool IsSystem { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public DateTime CreatedOn { get; set; }
        public ICollection<User> Users { get; set; }=new List<User>();


    }
}
