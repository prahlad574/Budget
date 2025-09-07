using BudgetBackend.Models.Classes;

namespace BudgetBackend.Services.Interfaces
{
    public interface ITaxPlanForFinancialYearService
    {
        public void AddTaxPlanForFinancialYear(TaxPlanForFinancialYear taxPlanForFinancialYear);
    }
}
