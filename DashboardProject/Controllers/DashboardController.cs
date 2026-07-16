using DashboardProject.Models;
using DashboardProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DashboardProject.Controllers
{
    //localhost:xxxx/api/Dashboard
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController:ControllerBase
    {
        private readonly IDashboardManager _dashboardManager;

        public DashboardController(
            IDashboardManager dashboardManager)
        {
            _dashboardManager = dashboardManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllDashboards() 
        {
            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrWhiteSpace(userIdClaim))
            {
                return Unauthorized();
            }

            var dashboards = await _dashboardManager
                .GetDashboardsForUserAsync(Guid.Parse(userIdClaim));

            return Ok(dashboards);
        }

        [Authorize]
        [HttpGet]        
        [Route("{id:guid}/widget")]
        public async Task<IActionResult> GetWidgetByDashboardId(Guid id)
        {

            var widgets =
        await _dashboardManager.GetWidgetsByDashboardIdAsync(id);

            return Ok(widgets);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<IActionResult> AddDashboard(AddDashboardDto addDashboardDto)
        {
            var dashboard =
                await _dashboardManager.CreateAsync(addDashboardDto);

            return Ok(dashboard);
        }


        [Authorize(Roles = "Administrator")]
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateDashboard(Guid id,UpdateDashboardDto updateDashboardDto)
        {
            var dashboard =
                await _dashboardManager.UpdateAsync(id, updateDashboardDto);

            return Ok(dashboard);
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteDashboard(Guid id)
        {
            var dashboard = await _dashboardManager.DeleteAsync(id);

            return Ok(dashboard);
        }

    }
}
