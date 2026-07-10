using DashboardProject.Models;
using DashboardProject.Services;
using Microsoft.AspNetCore.Mvc;

namespace DashboardProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login(
            [FromServices] AuthService authService,
            [FromBody] LoginDto loginDto)
        {
            var response = await authService.AuthenticateAsync(loginDto);

            if (response == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            return Ok(response);
        }
    }
}