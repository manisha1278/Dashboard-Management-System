using DashboardProject.Models;

namespace DashboardProject.Services.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponseDto?> AuthenticateAsync(LoginDto loginDto);
    }
}