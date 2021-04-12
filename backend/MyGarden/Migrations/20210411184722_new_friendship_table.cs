using Microsoft.EntityFrameworkCore.Migrations;

namespace MyGarden.Migrations
{
    public partial class new_friendship_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friendships_Profiles_ApplicationUserId",
                table: "Friendships");

            migrationBuilder.DropForeignKey(
                name: "FK_Friendships_Profiles_Friend1Id",
                table: "Friendships");

            migrationBuilder.DropForeignKey(
                name: "FK_Friendships_Profiles_Friend2Id",
                table: "Friendships");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Friendships",
                table: "Friendships");

            migrationBuilder.DropIndex(
                name: "IX_Friendships_ApplicationUserId",
                table: "Friendships");

            migrationBuilder.DropIndex(
                name: "IX_Friendships_Friend1Id",
                table: "Friendships");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Friendships");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Friendships");

            migrationBuilder.RenameColumn(
                name: "Friend2Id",
                table: "Friendships",
                newName: "ToId");

            migrationBuilder.RenameColumn(
                name: "Friend1Id",
                table: "Friendships",
                newName: "FromId");

            migrationBuilder.RenameIndex(
                name: "IX_Friendships_Friend2Id",
                table: "Friendships",
                newName: "IX_Friendships_ToId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Friendships",
                table: "Friendships",
                columns: new[] { "FromId", "ToId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Friendships_Profiles_FromId",
                table: "Friendships",
                column: "FromId",
                principalTable: "Profiles",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Friendships_Profiles_ToId",
                table: "Friendships",
                column: "ToId",
                principalTable: "Profiles",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friendships_Profiles_FromId",
                table: "Friendships");

            migrationBuilder.DropForeignKey(
                name: "FK_Friendships_Profiles_ToId",
                table: "Friendships");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Friendships",
                table: "Friendships");

            migrationBuilder.RenameColumn(
                name: "ToId",
                table: "Friendships",
                newName: "Friend2Id");

            migrationBuilder.RenameColumn(
                name: "FromId",
                table: "Friendships",
                newName: "Friend1Id");

            migrationBuilder.RenameIndex(
                name: "IX_Friendships_ToId",
                table: "Friendships",
                newName: "IX_Friendships_Friend2Id");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Friendships",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "ApplicationUserId",
                table: "Friendships",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Friendships",
                table: "Friendships",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Friendships_ApplicationUserId",
                table: "Friendships",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Friendships_Friend1Id",
                table: "Friendships",
                column: "Friend1Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Friendships_Profiles_ApplicationUserId",
                table: "Friendships",
                column: "ApplicationUserId",
                principalTable: "Profiles",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Friendships_Profiles_Friend1Id",
                table: "Friendships",
                column: "Friend1Id",
                principalTable: "Profiles",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Friendships_Profiles_Friend2Id",
                table: "Friendships",
                column: "Friend2Id",
                principalTable: "Profiles",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
