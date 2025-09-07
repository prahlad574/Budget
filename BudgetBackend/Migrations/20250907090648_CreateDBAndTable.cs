using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetBackend.Migrations
{
    /// <inheritdoc />
    public partial class CreateDBAndTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaxPlanForFinancialYear",
                columns: table => new
                {
                    TaxPlanForFinancialYearID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FinancialYear = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InvestmentName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InvestmentAmount = table.Column<int>(type: "int", nullable: false),
                    NoOfMonths = table.Column<int>(type: "int", nullable: false),
                    Section = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvestingIn = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxPlanForFinancialYear", x => x.TaxPlanForFinancialYearID);
                });

            migrationBuilder.CreateTable(
                name: "TaxPlanTransactions",
                columns: table => new
                {
                    TaxPlanTransactionID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaxPlanForFinancialYearID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TransactionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TransactionAmount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxPlanTransactions", x => x.TaxPlanTransactionID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaxPlanForFinancialYear");

            migrationBuilder.DropTable(
                name: "TaxPlanTransactions");
        }
    }
}
