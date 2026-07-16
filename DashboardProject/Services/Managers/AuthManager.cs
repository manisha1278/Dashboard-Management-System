using DashboardProject.Models;
using DashboardProject.Services.Interfaces;

namespace DashboardProject.Services.Managers
{
    public class AuthManager : IAuthManager
    {
        private readonly IAuthService _authService;

        public AuthManager(IAuthService authService)
        {
            _authService = authService;
        }

        public Task<LoginResponseDto?> AuthenticateAsync(LoginDto loginDto)
        {
            return _authService.AuthenticateAsync(loginDto);
        }
    }
}
