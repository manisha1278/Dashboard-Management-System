using DashboardProject.Data;
using DashboardProject.Models;
using DashboardProject.Models.Entities;
using DashboardProject.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DashboardProject.Services
{
    public class DashboardService:IDashboardService
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
        public async Task<List<Widget>> GetWidgetsByDashboardIdAsync(Guid dashboardId)
        {
            return await _context.DashboardWidgets
                .Where(dw => dw.DashboardId == dashboardId)
                .Select(dw => dw.Widget)
                .ToListAsync();
        }
        public async Task<Dashboard> CreateAsync(AddDashboardDto dto)
        {
            dto.Name = dto.Name.Trim();

            if (string.IsNullOrWhiteSpace(dto.Name))
            {
                throw new Exception("Dashboard name is required.");
            }

            bool exists = await _context.Dashboards
                .AnyAsync(x => x.Name.ToLower() == dto.Name.ToLower());

            if (exists)
            {
                throw new Exception("Dashboard already exists.");
            }

            var dashboard = new Dashboard
            {
                Name = dto.Name
            };

            _context.Dashboards.Add(dashboard);

            await _context.SaveChangesAsync();

            return dashboard;
        }

        public async Task<Dashboard> UpdateAsync(
    Guid id,
    UpdateDashboardDto dto)
        {
            dto.Name = dto.Name.Trim();

            if (string.IsNullOrWhiteSpace(dto.Name))
            {
                throw new Exception("Dashboard name is required.");
            }

            var dashboard = await _context.Dashboards
                .FirstOrDefaultAsync(x => x.Id == id);

            if (dashboard == null)
            {
                throw new Exception("Dashboard not found.");
            }

            bool exists = await _context.Dashboards.AnyAsync(x =>
                x.Id != id &&
                x.Name.ToLower() == dto.Name.ToLower());

            if (exists)
            {
                throw new Exception("Dashboard already exists.");
            }

            dashboard.Name = dto.Name;

            await _context.SaveChangesAsync();

            return dashboard;
        }
        public async Task<Dashboard> DeleteAsync(Guid id)
        {
            var dashboard = await _context.Dashboards
                .FirstOrDefaultAsync(x => x.Id == id);

            if (dashboard == null)
            {
                throw new Exception("Dashboard not found.");
            }

            _context.Dashboards.Remove(dashboard);

            await _context.SaveChangesAsync();

            return dashboard;
        }
    }
}