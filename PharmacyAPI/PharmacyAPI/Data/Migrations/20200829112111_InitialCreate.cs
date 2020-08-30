using Microsoft.EntityFrameworkCore.Migrations;

namespace PharmacyAPI.Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "medRecord",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_medRecord_name",
                table: "medRecord",
                column: "name",
                unique: true,
                filter: "[name] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_medRecord_name",
                table: "medRecord");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "medRecord",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
