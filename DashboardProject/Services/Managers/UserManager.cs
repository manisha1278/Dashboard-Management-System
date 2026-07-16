using DashboardProject.Models;
using DashboardProject.Services.Interfaces;

namespace DashboardProject.Services.Managers
{
    public class UserManager : IUserManager
    {
        private readonly IUserService _userService;

        public UserManager(IUserService userService)
        {
            _userService = userService;
        }

        public Task<List<UserDto>> GetAllAsync()
        {
            return _userService.GetAllAsync();
        }

        public Task<UserDto?> GetByIdAsync(Guid id)
        {
            return _userService.GetByIdAsync(id);
        }

        public Task<UserDto> CreateAsync(CreateUserDto dto)
        {
            return _userService.CreateAsync(dto);
        }

        public Task<UserDto> UpdateAsync(Guid id, UpdateUserDto dto)
        {
            return _userService.UpdateAsync(id, dto);
        }
    }
}