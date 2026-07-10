namespace DashboardProject.Models
{
    public class AddWidgetDto
    {
        public required string Name { get; set; }

        public required string ChartType { get; set; }

        public Guid DashboardId { get; set; }
    }
}
