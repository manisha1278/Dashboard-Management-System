using DashboardProject.Models;

namespace DashboardProject.Services.Interfaces
{
    public interface IAuthManager
    {
        Task<LoginResponseDto?> AuthenticateAsync(LoginDto loginDto);
    }
}
