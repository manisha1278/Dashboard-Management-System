using DashboardProject.Data;
using DashboardProject.Models;
using DashboardProject.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace DashboardProject.Controllers
{
    //localhost:xxxx/api/Widget
    [Route("api/[controller]")]
    [ApiController]
    public class WidgetController:ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public WidgetController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        [Authorize]
        [HttpPost]
        public IActionResult AddWidget(AddWidgetDto addWidgetDto)
        {
            
                var widgetEntity = new Widget()
                {
                    Name = addWidgetDto.Name,
                    ChartType = addWidgetDto.ChartType,
                    DashboardId = addWidgetDto.DashboardId
                };

                dbContext.Widgets.Add(widgetEntity);
                dbContext.SaveChanges();

                var dashboardWidget = new DashboardWidget()
                {
                    DashboardId = addWidgetDto.DashboardId,
                    WidgetId = widgetEntity.Id
                };

                dbContext.DashboardWidgets.Add(dashboardWidget);
                dbContext.SaveChanges();

                return Ok(widgetEntity);

           




        }

        [Authorize]
        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateWidget(Guid id, UpdateWidgetDto updateWidgetDto)//used
        {
            var widget = dbContext.Widgets.Find(id);
            if (widget is null)
            {
                return NotFound();
            }
            widget.Name = updateWidgetDto.Name;
           widget.ChartType = updateWidgetDto.ChartType;

            dbContext.SaveChanges();
            return Ok(widget);
        }
        [Authorize]
        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteWidget(Guid id)       //used
        {
            var widget = dbContext.Widgets.Find(id);
            if (widget is null)
            {
                return NotFound();
            }
            dbContext.Widgets.Remove(widget);
            dbContext.SaveChanges();
            return Ok(widget);
        }
    }
}
