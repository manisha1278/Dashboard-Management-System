using DashboardProject.Models;
using DashboardProject.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DashboardProject.Controllers
{
    [ApiController]
    [Route("api/users/{userId:guid}/dashboards")]
    public class UserDashboardAssignmentController : ControllerBase
    {
        private readonly IUserDashboardService _userDashboardService;

        public UserDashboardAssignmentController(
            IUserDashboardService userDashboardService)
        {
            _userDashboardService = userDashboardService;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserDashboardDto>>> GetUserDashboards(
            Guid userId)
        {
            var dashboards =
                await _userDashboardService.GetUserDashboardsAsync(userId);

            return Ok(dashboards);
        }

        [HttpPut]
        public async Task<IActionResult> AssignDashboards(
            Guid userId,
            [FromBody] List<Guid> dashboardIds)
        {
            await _userDashboardService.AssignDashboardsAsync(
                userId,
                dashboardIds);

            return NoContent();
        }
    }
}