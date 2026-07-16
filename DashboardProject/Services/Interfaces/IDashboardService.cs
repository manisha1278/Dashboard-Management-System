using DashboardProject.Models;
using DashboardProject.Models.Entities;

namespace DashboardProject.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<List<Dashboard>> GetDashboardsForUserAsync(Guid userId);

        Task<List<Widget>> GetWidgetsByDashboardIdAsync(Guid dashboardId);

        Task<Dashboard> CreateAsync(AddDashboardDto dto);

        Task<Dashboard> UpdateAsync(
            Guid id,
            UpdateDashboardDto dto);

        Task<Dashboard> DeleteAsync(Guid id);
    }
}
