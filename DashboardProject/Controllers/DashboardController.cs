using DashboardProject.Data;
using DashboardProject.Models;
using DashboardProject.Models.Entities;
using DashboardProject.Services;
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
        private readonly ApplicationDbContext dbContext;
        private readonly DashboardService dashboardService;
       

        public DashboardController(ApplicationDbContext dbContext, DashboardService dashboardService)
        {
            this.dbContext = dbContext;
            this.dashboardService = dashboardService;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllDashboards() //used
        {
            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrWhiteSpace(userIdClaim))
            {
                return Unauthorized();
            }

            var dashboards = await dashboardService
                .GetDashboardsForUserAsync(Guid.Parse(userIdClaim));

            return Ok(dashboards);
        }
        [Authorize]
        [HttpGet]        
        [Route("{id:guid}/widget")]
        public IActionResult GetWidgetByDashboardId(Guid id)//used
        {

            var widgets = dbContext.DashboardWidgets
                .Where(dw => dw.DashboardId == id)
                .Select(dw => dw.Widget)
                .ToList();

            return Ok(widgets);
        }
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public IActionResult AddDashboard(AddDashboardDto addDashboardDto)//used
        {
            var dashboardEntity = new Dashboard()
            {
                Name = addDashboardDto.Name
                
            };
            dbContext.Dashboards.Add(dashboardEntity);
            dbContext.SaveChanges();
            return Ok(dashboardEntity);
        }
        [Authorize(Roles="Administrator")]
        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateDashboard(Guid id, UpdateDashboardDto updateDashboardDto)//used
        {
            var dashboard = dbContext.Dashboards.Find(id);
            if (dashboard is null)
            {
                return NotFound();
            }
            dashboard.Name = updateDashboardDto.Name;
            
            dbContext.SaveChanges();
            return Ok(dashboard);
        }
        [Authorize(Roles = "Administrator")] 
        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteDashboard(Guid id)  //used
        {
            var dashboard = dbContext.Dashboards.Find(id);
            if (dashboard is null)
            {
                return NotFound();
            }
            dbContext.Dashboards.Remove(dashboard);
            dbContext.SaveChanges();
            return Ok(dashboard);
        }

    }
}
