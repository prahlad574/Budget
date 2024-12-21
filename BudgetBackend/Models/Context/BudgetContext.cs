using Microsoft.EntityFrameworkCore;

namespace BudgetBackend.Models.Context
{
    public class BudgetContext : DbContext
    {
        public BudgetContext(DbContextOptions<BudgetContext> options): base(options)
        {
            
        }
    }
}
