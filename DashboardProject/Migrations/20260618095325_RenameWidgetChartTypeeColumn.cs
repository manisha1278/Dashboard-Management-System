using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DashboardProject.Migrations
{
    /// <inheritdoc />
    public partial class RenameWidgetChartTypeeColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CharType",
                table: "Widgets",
                newName: "ChartType");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ChartType",
                table: "Widgets",
                newName: "CharType");
        }
    }
}
