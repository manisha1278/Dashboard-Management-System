using DashboardProject.Models;
using DashboardProject.Services;
using DashboardProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace DashboardProject.Controllers
{
    //localhost:xxxx/api/Widget
    [Route("api/[controller]")]
    [ApiController]
    public class WidgetController:ControllerBase
    {
        private readonly IWidgetManager _widgetManager;

        public WidgetController(IWidgetManager widgetManager)
        {
            _widgetManager = widgetManager;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddWidget(AddWidgetDto addWidgetDto)
        {
            var widget = await _widgetManager.CreateAsync(addWidgetDto);

            return Ok(widget);
        }


        [Authorize]
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateWidget(
     Guid id,
     UpdateWidgetDto updateWidgetDto)
        {
            var widget =
                await _widgetManager.UpdateAsync(id, updateWidgetDto);

            return Ok(widget);
        }

        [Authorize]
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteWidget(Guid id)
        {
            var widget = await _widgetManager.DeleteAsync(id);

            return Ok(widget);
        }
    }
}
