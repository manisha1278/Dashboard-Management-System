using DashboardProject.Common;
using DashboardProject.Data;
using DashboardProject.Models;
using DashboardProject.Models.Entities;
using DashboardProject.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DashboardProject.Services
{
    public class UserTypeService : IUserTypeService
    {
        private readonly ApplicationDbContext _context;

        public UserTypeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserTypeDto>> GetAllAsync()
        {
            var userTypes = await _context.UserTypes
                .AsNoTracking()
                .OrderByDescending(x => x.IsSystem)
                .ThenBy(x => x.Name)
                .ToListAsync();
            var admin = await _context.Users
     .AsNoTracking()
     .FirstAsync(x => x.IsSystem);

            return userTypes
                .Select(x => Map(x, admin.Username))
                .ToList();
        }

        public async Task<UserTypeDto?> GetByIdAsync(Guid id)
        {
            var entity = await _context.UserTypes
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null)
            {
                return null;
            }

            var admin = await _context.Users
                .AsNoTracking()
                .FirstAsync(x => x.IsSystem);

            return Map(entity, admin.Username);
        }

        public async Task<UserTypeDto> CreateAsync(CreateUserTypeDto dto)
        {
            dto.Name = dto.Name.Trim();

            if (string.IsNullOrWhiteSpace(dto.Name))
            {
                throw new Exception("User Type name is required.");
            }

            if (dto.Name.Equals(
       SystemConstants.AdministratorRole,
           StringComparison.OrdinalIgnoreCase))
            {
                throw new Exception("Administrator is reserved.");
            }

            bool exists = await _context.UserTypes.AnyAsync(x =>
                x.Name.ToLower() == dto.Name.ToLower());

            if (exists)
            {
                throw new Exception("User Type already exists.");
            }
            var admin = await _context.Users
           .AsNoTracking()
           .FirstAsync(x => x.IsSystem);


            var entity = new UserType
            {
                Id = Guid.NewGuid(),

                Name = dto.Name,

                IsActive = true,

                IsSystem = false,

                CreatedByUserId = admin.Id,

                CreatedOn = DateTime.UtcNow
            };

            _context.UserTypes.Add(entity);

            await _context.SaveChangesAsync();

            return Map(entity, admin.Username);
        }

        public async Task<UserTypeDto> UpdateAsync(
            Guid id,
            UpdateUserTypeDto dto)
        {
            var entity = await _context.UserTypes
                .FirstOrDefaultAsync(x => x.Id == id);

            if (entity == null)
            {
                throw new Exception("User Type not found.");
            }

            if (entity.IsSystem)
            {
                throw new Exception(
                    "System User Type cannot be modified.");
            }

            dto.Name = dto.Name.Trim();

            if (string.IsNullOrWhiteSpace(dto.Name))
            {
                throw new Exception("User Type name is required.");
            }

            bool duplicate = await _context.UserTypes.AnyAsync(x =>
                x.Id != id &&
                x.Name.ToLower() == dto.Name.ToLower());

            if (duplicate)
            {
                throw new Exception("User Type already exists.");
            }

            entity.Name = dto.Name;

            entity.IsActive = dto.IsActive;

            await _context.SaveChangesAsync();

            var admin = await _context.Users
            .AsNoTracking()
           .FirstAsync(x => x.IsSystem);

            return Map(entity, admin.Username);
        }

        private UserTypeDto Map(UserType entity,string createdBy)
        {
            return new UserTypeDto
            {
                Id = entity.Id,

                Name = entity.Name,

                IsActive = entity.IsActive,

                IsSystem = entity.IsSystem,

                CreatedOn = entity.CreatedOn,
                CreatedBy=createdBy
            };
        }
    }
}