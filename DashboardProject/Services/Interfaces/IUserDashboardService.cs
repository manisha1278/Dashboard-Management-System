 using DashboardProject.Models;

namespace DashboardProject.Services.Interfaces
    {
        public interface IUserDashboardService
        {
            Task<List<UserDashboardDto>> GetUserDashboardsAsync(Guid userId);

            Task AssignDashboardsAsync( Guid userId, List<Guid> dashboardIds);
        }
    }


