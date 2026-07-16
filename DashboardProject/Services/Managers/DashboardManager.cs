using DashboardProject.Models;
using DashboardProject.Models.Entities;
using DashboardProject.Services.Interfaces;

namespace DashboardProject.Services.Managers
{
    public class DashboardManager : IDashboardManager
    {
        private readonly IDashboardService _dashboardService;

        public DashboardManager(
            IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        public Task<List<Dashboard>> GetDashboardsForUserAsync(
            Guid userId)
        {
            return _dashboardService
                .GetDashboardsForUserAsync(userId);
        }

        public Task<List<Widget>> GetWidgetsByDashboardIdAsync(
            Guid dashboardId)
        {
            return _dashboardService
                .GetWidgetsByDashboardIdAsync(dashboardId);
        }

        public Task<Dashboard> CreateAsync(
            AddDashboardDto dto)
        {
            return _dashboardService
                .CreateAsync(dto);
        }

        public Task<Dashboard> UpdateAsync(
            Guid id,
            UpdateDashboardDto dto)
        {
            return _dashboardService
                .UpdateAsync(id, dto);
        }

        public Task<Dashboard> DeleteAsync(Guid id)
        {
            return _dashboardService
                .DeleteAsync(id);
        }
    }
}