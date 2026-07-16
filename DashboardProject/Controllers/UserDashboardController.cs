using DashboardProject.Models;
using DashboardProject.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DashboardProject.Controllers
{
    [ApiController]
    [Route("api/users/{userId:guid}/dashboards")]
    public class UserDashboardController : ControllerBase
    {
        private readonly IUserDashboardManager _userDashboardManager;

        public UserDashboardController(
            IUserDashboardManager userDashboardManager)
        {
            _userDashboardManager = userDashboardManager;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserDashboardDto>>> GetUserDashboards(
            Guid userId)
        {
            var dashboards =
                await _userDashboardManager.GetUserDashboardsAsync(userId);

            return Ok(dashboards);
        }

        [HttpPut]
        public async Task<IActionResult> AssignDashboards(
            Guid userId,
            [FromBody] List<Guid> dashboardIds)
        {
            await _userDashboardManager.AssignDashboardsAsync(
                userId,
                dashboardIds);

            return NoContent();
        }
    }
}