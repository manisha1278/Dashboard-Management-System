using DashboardProject.Data;
using DashboardProject.Models;
using DashboardProject.Models.Entities;
using DashboardProject.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DashboardProject.Services
{
    public class WidgetService:IWidgetService
    {
        private readonly ApplicationDbContext _context;

        public WidgetService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Widget> CreateAsync(AddWidgetDto dto)
        {
            dto.Name = dto.Name.Trim();

            if (string.IsNullOrWhiteSpace(dto.Name))
            {
                throw new Exception("Widget name is required.");
            }

            var dashboard = await _context.Dashboards
                .FirstOrDefaultAsync(x => x.Id == dto.DashboardId);

            if (dashboard == null)
            {
                throw new Exception("Dashboard not found.");
            }

            var widget = new Widget
            {
                Name = dto.Name,
                ChartType = dto.ChartType,
                DashboardId = dto.DashboardId
            };

            _context.Widgets.Add(widget);

            await _context.SaveChangesAsync();

            var dashboardWidget = new DashboardWidget
            {
                DashboardId = dto.DashboardId,
                WidgetId = widget.Id
            };

            _context.DashboardWidgets.Add(dashboardWidget);

            await _context.SaveChangesAsync();

            return widget;
        }

        public async Task<Widget> UpdateAsync(
    Guid id,
    UpdateWidgetDto dto)
        {
            dto.Name = dto.Name.Trim();

            if (string.IsNullOrWhiteSpace(dto.Name))
            {
                throw new Exception("Widget name is required.");
            }

            var widget = await _context.Widgets
                .FirstOrDefaultAsync(x => x.Id == id);

            if (widget == null)
            {
                throw new Exception("Widget not found.");
            }

            bool exists = await _context.Widgets.AnyAsync(x =>
            x.Id != id &&
            x.DashboardId == widget.DashboardId &&
            x.Name.ToLower() == dto.Name.ToLower());

            if (exists)
            {
                throw new Exception("Widget name already exists in this dashboard.");
            }

            widget.Name = dto.Name;
            widget.ChartType = dto.ChartType;

            await _context.SaveChangesAsync();

            return widget;
        }
        public async Task<Widget> DeleteAsync(Guid id)
        {
            var widget = await _context.Widgets
                .FirstOrDefaultAsync(x => x.Id == id);

            if (widget == null)
            {
                throw new Exception("Widget not found.");
            }

            _context.Widgets.Remove(widget);

            await _context.SaveChangesAsync();

            return widget;
        }
    }
}