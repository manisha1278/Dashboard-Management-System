using DashboardProject.Models;

namespace DashboardProject.Services.Interfaces
{
    public interface IUserDashboardManager
    {
        Task<List<UserDashboardDto>> GetUserDashboardsAsync(Guid userId);

        Task AssignDashboardsAsync(Guid userId, List<Guid> dashboardIds);
    }
}
