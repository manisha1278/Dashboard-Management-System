using DashboardProject.Common;
using DashboardProject.Data;
using DashboardProject.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace DashboardProject.Services
{
    public class SeedService
    {
        private readonly ApplicationDbContext _context;

        public SeedService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SeedAsync()
        {
            await SeedAdministratorRoleAsync();

            await SeedAdministratorUserAsync();

            await AssignDashboardsToAdminAsync();
        }

        private async Task SeedAdministratorRoleAsync()
        {
            if (await _context.UserTypes.AnyAsync(x => x.Name==SystemConstants.AdministratorRole))
                return;

            var administrator = new UserType
            {
                Id = Guid.NewGuid(),
                Name = "Administrator",
                IsActive = true,
                IsSystem = true,
                CreatedOn = DateTime.UtcNow
            };

            _context.UserTypes.Add(administrator);

            await _context.SaveChangesAsync();
        }

        private async Task SeedAdministratorUserAsync()
        {
            var admin = await _context.Users
                .FirstOrDefaultAsync(x =>
                    x.Username == SystemConstants.AdministratorUsername);

            if (admin != null)
            {
                if (string.IsNullOrWhiteSpace(admin.PasswordHash))
                {
                    admin.PasswordHash =
                        BCrypt.Net.BCrypt.HashPassword("admin123");

                    await _context.SaveChangesAsync();
                }

                return;
            }

            var adminRole = await _context.UserTypes
                .FirstAsync(x => x.IsSystem);

            admin = new User
            {
                Id = Guid.NewGuid(),

                Username = SystemConstants.AdministratorUsername,

                PasswordHash =
                    BCrypt.Net.BCrypt.HashPassword("admin123"),

                FullName = "Administrator",

                Email = "admin@gmail.com",

                Contact = "94254656768",

                IsActive = true,

                IsSystem = true,

                UserTypeId = adminRole.Id,

                CreatedOn = DateTime.UtcNow
            };

            _context.Users.Add(admin);

            await _context.SaveChangesAsync();
        }
        private async Task AssignDashboardsToAdminAsync()
        {
            var admin = await _context.Users
                .FirstAsync(x => x.IsSystem);

            var dashboardIds = await _context.Dashboards
                .Select(x => x.Id)
                .ToListAsync();

            foreach (var dashboardId in dashboardIds)
            {
                bool exists = await _context.UserDashboards.AnyAsync(x =>
                    x.UserId == admin.Id &&
                    x.DashboardId == dashboardId);

                if (!exists)
                {
                    _context.UserDashboards.Add(new UserDashboard
                    {
                        UserId = admin.Id,
                        DashboardId = dashboardId
                    });
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}
