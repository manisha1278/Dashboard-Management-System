using DashboardProject.Models;

namespace DashboardProject.Services.Interfaces
{
    public interface IUserTypeManager
    {
        Task<List<UserTypeDto>> GetAllAsync();
        Task<UserTypeDto?> GetByIdAsync(Guid id);
        Task<UserTypeDto> CreateAsync(CreateUserTypeDto dto);
        Task<UserTypeDto> UpdateAsync(Guid id, UpdateUserTypeDto dto);
    }
}
