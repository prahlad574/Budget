using BudgetBackend.Models.Context;
using BudgetBackend.Models.Entities;
using BudgetBackend.Repositories.Interfaces;

namespace BudgetBackend.Repositories
{
    public class TaxPlanForFinancialYearRepository : Repository<TaxPlanForFinancialYearEntity>, ITaxPlanForFinancialYearRepository
    {
        public TaxPlanForFinancialYearRepository(BudgetContext budgetContext) : base(budgetContext)
        {
        }
    }
}
