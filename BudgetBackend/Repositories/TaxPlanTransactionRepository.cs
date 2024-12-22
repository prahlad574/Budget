using BudgetBackend.Models.Context;
using BudgetBackend.Models.Entities;
using BudgetBackend.Repositories.Interfaces;

namespace BudgetBackend.Repositories
{
    public class TaxPlanTransactionRepository : Repository<TaxPlanTransactionsEntity>, ITaxPlanTransactionRepository
    {
        public TaxPlanTransactionRepository(BudgetContext budgetContext) : base(budgetContext)
        {
            
        }
    }
}
