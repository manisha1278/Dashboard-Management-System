using DashboardProject.Models;
using DashboardProject.Models.Entities;

namespace DashboardProject.Services.Interfaces
{
    public interface IWidgetManager
    {
        Task<Widget> CreateAsync(AddWidgetDto dto);

        Task<Widget> UpdateAsync(
            Guid id,
            UpdateWidgetDto dto);

        Task<Widget> DeleteAsync(Guid id);
    }
}
