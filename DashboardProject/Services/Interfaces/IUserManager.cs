using DashboardProject.Models;

namespace DashboardProject.Services.Interfaces
{
    public interface IUserManager
    {
        Task<List<UserDto>> GetAllAsync();
        Task<UserDto?> GetByIdAsync(Guid id);
        Task<UserDto> CreateAsync(CreateUserDto dto);
        Task<UserDto> UpdateAsync(Guid id, UpdateUserDto dto);
    }
}
