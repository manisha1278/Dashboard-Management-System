using DashboardProject.Models;
using DashboardProject.Models.Entities;
using DashboardProject.Services.Interfaces;

namespace DashboardProject.Services.Managers
{
    public class WidgetManager : IWidgetManager
    {
        private readonly IWidgetService _widgetService;

        public WidgetManager(IWidgetService widgetService)
        {
            _widgetService = widgetService;
        }

        public Task<Widget> CreateAsync(AddWidgetDto dto)
        {
            return _widgetService.CreateAsync(dto);
        }

        public Task<Widget> UpdateAsync(
            Guid id,
            UpdateWidgetDto dto)
        {
            return _widgetService.UpdateAsync(id, dto);
        }

        public Task<Widget> DeleteAsync(Guid id)
        {
            return _widgetService.DeleteAsync(id);
        }
    }
}