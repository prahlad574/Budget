using BudgetBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace BudgetBackend.Models.Context
{
    public class BudgetContext : DbContext
    {
        public BudgetContext(DbContextOptions<BudgetContext> options): base(options)
        {
            
        }

        public DbSet<TaxPlanForFinancialYearEntity> TaxPlanForFinancialYear { get; set; }
        public DbSet<TaxPlanTransactionsEntity> TaxPlanTransactions { get; set; }
    }
}
