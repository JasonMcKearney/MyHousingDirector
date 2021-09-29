using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DBUserTbls",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    firstName = table.Column<string>(type: "nvarchar(64)", nullable: true),
                    lastName = table.Column<string>(type: "nvarchar(64)", nullable: true),
                    username = table.Column<string>(type: "nvarchar(64)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    password = table.Column<string>(type: "nvarchar(64)", nullable: true),
                    confirmpassword = table.Column<string>(type: "nvarchar(64)", nullable: true),
                    verificationCode = table.Column<string>(type: "nvarchar(16)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DBUserTbls", x => x.user_id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DBUserTbls");
        }
    }
}
