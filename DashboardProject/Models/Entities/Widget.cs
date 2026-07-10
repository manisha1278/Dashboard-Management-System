namespace DashboardProject.Models.Entities
{
    public class Widget
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }

        public required string ChartType { get; set; }

        public Guid DashboardId { get; set; }

        public ICollection<DashboardWidget> DashboardWidgets { get; set; } = new List<DashboardWidget>();
    }
}
