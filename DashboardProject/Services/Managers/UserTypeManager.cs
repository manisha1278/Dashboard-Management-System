using DashboardProject.Models;
using DashboardProject.Services.Interfaces;

namespace DashboardProject.Services.Managers
{
    public class UserTypeManager : IUserTypeManager
    {
        private readonly IUserTypeService _userTypeService;

        public UserTypeManager(IUserTypeService userTypeService)
        {
            _userTypeService = userTypeService;
        }

        public Task<List<UserTypeDto>> GetAllAsync()
        {
            return _userTypeService.GetAllAsync();
        }

        public Task<UserTypeDto?> GetByIdAsync(Guid id)
        {
            return _userTypeService.GetByIdAsync(id);
        }

        public Task<UserTypeDto> CreateAsync(CreateUserTypeDto dto)
        {
            return _userTypeService.CreateAsync(dto);
        }

        public Task<UserTypeDto> UpdateAsync(
            Guid id,
            UpdateUserTypeDto dto)
        {
            return _userTypeService.UpdateAsync(id, dto);
        }
    }
}
