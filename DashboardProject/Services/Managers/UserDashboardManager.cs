using DashboardProject.Models;
using DashboardProject.Services.Interfaces;

namespace DashboardProject.Services.Managers
{
    public class UserDashboardManager : IUserDashboardManager
    {
        private readonly IUserDashboardService _userDashboardService;

        public UserDashboardManager(
            IUserDashboardService userDashboardService)
        {
            _userDashboardService = userDashboardService;
        }

        public Task<List<UserDashboardDto>> GetUserDashboardsAsync(
            Guid userId)
        {
            return _userDashboardService
                .GetUserDashboardsAsync(userId);
        }

        public Task AssignDashboardsAsync(
            Guid userId,
            List<Guid> dashboardIds)
        {
            return _userDashboardService
                .AssignDashboardsAsync(userId, dashboardIds);
        }
    }
}