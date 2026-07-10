using DashboardProject.Data;
using DashboardProject.Models;
using DashboardProject.Models.Entities;
using DashboardProject.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DashboardProject.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserDto>> GetAllAsync()
        {
            var users = await _context.Users
                .AsNoTracking()
                .Include(x => x.UserType)
                .OrderByDescending(x => x.IsSystem)
                .ThenBy(x => x.Username)
                .ToListAsync();

            var admin = await _context.Users
     .AsNoTracking()
     .FirstAsync(x => x.IsSystem);

            return users
                .Select(x => Map(x, admin.Username))
                .ToList();
        }

        public async Task<UserDto?> GetByIdAsync(Guid id)
        {
            var user = await _context.Users
                .AsNoTracking()
                .Include(x => x.UserType)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
            {
                return null;
            }

            var admin = await _context.Users
                .AsNoTracking()
                .FirstAsync(x => x.IsSystem);

            return Map(user, admin.Username);
        }

        public async Task<UserDto> CreateAsync(CreateUserDto dto)
        {
            dto.Username = dto.Username.Trim();
            dto.FullName = dto.FullName.Trim();
            dto.Email = dto.Email.Trim();
            dto.Contact = dto.Contact.Trim();

            if (string.IsNullOrWhiteSpace(dto.Username))
                throw new Exception("Username is required.");

            if (string.IsNullOrWhiteSpace(dto.FullName))
                throw new Exception("Full Name is required.");

            if (string.IsNullOrWhiteSpace(dto.Email))
                throw new Exception("Email is required.");

            if (string.IsNullOrWhiteSpace(dto.Contact))
                throw new Exception("Contact is required.");

            bool usernameExists = await _context.Users.AnyAsync(x =>
                x.Username.ToLower() == dto.Username.ToLower());

            if (usernameExists)
                throw new Exception("Username already exists.");

            var userType = await _context.UserTypes
                .FirstOrDefaultAsync(x => x.Id == dto.UserTypeId);

            if (userType == null)
                throw new Exception("User Type not found.");

            if (userType.IsSystem)
                throw new Exception(
                    "Cannot create a user inside Administrator role.");
            var admin = await _context.Users
            .AsNoTracking()
           .FirstAsync(x => x.IsSystem);

            var user = new User
            {
                Id = Guid.NewGuid(),

                Username = dto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),

                FullName = dto.FullName,

                Email = dto.Email,

                Contact = dto.Contact,

                UserTypeId = dto.UserTypeId,

                IsActive = true,

                IsSystem = false,

                CreatedByUserId = admin.Id,

                CreatedOn = DateTime.UtcNow
            };

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            user.UserType = userType;

            return Map(user,admin.Username);
        }

        public async Task<UserDto> UpdateAsync(
     Guid id,
     UpdateUserDto dto)
        {
            var user = await _context.Users
                .Include(x => x.UserType)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            dto.Username = dto.Username.Trim();
            dto.FullName = dto.FullName.Trim();
            dto.Email = dto.Email.Trim();
            dto.Contact = dto.Contact.Trim();

            bool usernameExists = await _context.Users.AnyAsync(x =>
                x.Id != id &&
                x.Username.ToLower() == dto.Username.ToLower());

            if (usernameExists)
            {
                throw new Exception("Username already exists.");
            }

            var userType = await _context.UserTypes
                .FirstOrDefaultAsync(x => x.Id == dto.UserTypeId);

            if (userType == null)
            {
                throw new Exception("User Type not found.");
            }

            if (user.IsSystem)
            {
                
                user.Email = dto.Email;
                user.Contact = dto.Contact;
                user.IsActive = dto.IsActive;
            }
            else
            {
                
                user.Username = dto.Username;
                user.FullName = dto.FullName;
                user.Email = dto.Email;
                user.Contact = dto.Contact;
                user.UserTypeId = dto.UserTypeId;
                user.UserType = userType;
                user.IsActive = dto.IsActive;
            }

            await _context.SaveChangesAsync();

            var administrator = await _context.Users
                .AsNoTracking()
                .FirstAsync(x => x.IsSystem);

            return Map(user, administrator.Username);
        }

        private  UserDto Map(User user ,string createdBy)
        {
            return new UserDto
            {
                Id = user.Id,

                Username = user.Username,

                FullName = user.FullName,

                Email = user.Email,

                Contact = user.Contact,

                IsActive = user.IsActive,

                IsSystem = user.IsSystem,

                UserTypeId = user.UserTypeId,

                UserTypeName = user.UserType?.Name ?? string.Empty,

                CreatedOn = user.CreatedOn,
                 CreatedBy=createdBy
            };
        }
    }
}
