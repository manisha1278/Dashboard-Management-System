namespace DashboardProject.Models.Entities
{
    public class DashboardWidget
    {
        public Guid DashboardId { get; set; }
        public Dashboard Dashboard { get; set; }

        public Guid WidgetId { get; set; }

        public Widget Widget { get; set; }
    }

}
