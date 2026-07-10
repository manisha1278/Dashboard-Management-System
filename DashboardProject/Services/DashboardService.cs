using DashboardProject.Data;
using DashboardProject.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace DashboardProject.Services
{
    public class DashboardService
    {
        private readonly ApplicationDbContext _context;

        public DashboardService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Dashboard>> GetDashboardsForUserAsync(Guid userId)
        {
            var user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            // Administrator gets everything.
            if (user.IsSystem)
            {
                return await _context.Dashboards
                    .AsNoTracking()
                    .OrderBy(x => x.Name)
                    .ToListAsync();
            }

            // Normal user gets only assigned dashboards.
            return await _context.UserDashboards
                .Where(x => x.UserId == userId)
                .Select(x => x.Dashboard)
                .AsNoTracking()
                .OrderBy(x => x.Name)
                .ToListAsync();
        }
    }
}