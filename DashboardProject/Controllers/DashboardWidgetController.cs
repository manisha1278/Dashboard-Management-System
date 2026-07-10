using DashboardProject.Data;
using Microsoft.AspNetCore.Mvc;

namespace DashboardProject.Controllers
{

    //localhost:xxxx/api/DashboadWidgets
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardWidgetController:ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public DashboardWidgetController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

    }
}
