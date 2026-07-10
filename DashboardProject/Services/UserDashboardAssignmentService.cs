using DashboardProject.Data;
using DashboardProject.Models;
using DashboardProject.Models.Entities;
using DashboardProject.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DashboardProject.Services
{
    public class UserDashboardAssignmentService : IUserDashboardService
    {
        private readonly ApplicationDbContext _context;

        public UserDashboardAssignmentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserDashboardDto>> GetUserDashboardsAsync(Guid userId)
        {
            var user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            var dashboards = await _context.Dashboards
                .AsNoTracking()
                .OrderBy(x => x.Name)
                .ToListAsync();

            
            if (user.IsSystem)
            {
                return dashboards.Select(x => new UserDashboardDto
                {
                    DashboardId = x.Id,
                    DashboardName = x.Name,
                    IsAssigned = true
                }).ToList();
            }

            var assignedDashboardIds = await _context.UserDashboards
                .Where(x => x.UserId == userId)
                .Select(x => x.DashboardId)
                .ToListAsync();

            return dashboards.Select(x => new UserDashboardDto
            {
                DashboardId = x.Id,
                DashboardName = x.Name,
                IsAssigned = assignedDashboardIds.Contains(x.Id)
            }).ToList();
        }

        public async Task AssignDashboardsAsync(
            Guid userId,
            List<Guid> dashboardIds)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            if (user.IsSystem)
            {
                throw new Exception(
                    "Dashboards cannot be modified for Administrator.");
            }

            var dashboardsExist = await _context.Dashboards
                .Where(x => dashboardIds.Contains(x.Id))
                .CountAsync();

            if (dashboardsExist != dashboardIds.Count)
            {
                throw new Exception("One or more dashboards are invalid.");
            }

            var existingAssignments = await _context.UserDashboards
                .Where(x => x.UserId == userId)
                .ToListAsync();

            _context.UserDashboards.RemoveRange(existingAssignments);

            foreach (var dashboardId in dashboardIds.Distinct())
            {
                _context.UserDashboards.Add(new UserDashboard
                {
                    UserId = userId,
                    DashboardId = dashboardId
                });
            }

            await _context.SaveChangesAsync();
        }
    }
}