using BudgetBackend.Models.Classes;
using BudgetBackend.Models.Classes;

namespace BudgetBackend.Services.Interfaces
{
    public interface ITaxPlanForFinancialYearService
    {
        Task<bool> AddTaxPlanForFinancialYear(TaxPlanForFinancialYear taxPlanForFinancialYear);

        Task<IEnumerable<TaxPlanForFinancialYear>> GetTaxPlanForFinancialYear(string financialYear);

        Task<bool> UpdateTaxPlanForFinancialYear(TaxPlanForFinancialYear taxPlanForFinancialYear);
        Task<bool> DeleteTaxPlanForFinancialYear(Guid taxPlanForFinancialYearId);
    }
}
