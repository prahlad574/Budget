using BudgetBackend.Models.Classes;

namespace BudgetBackend.Services.Interfaces
{
    public interface ITaxPlanTransactionService
    {
        Task<bool> InsertTaxPlanTransaction(TaxPlanTransaction taxPlanTransactionDto);
        Task<IEnumerable<TaxPlanTransaction>> GetTransactionsForTaxplanForFinancialYearID(Guid taxPlanForFinancialyearID);
    }
}
