using BudgetBackend.Models.Classes;

namespace BudgetBackend.Services.Interfaces
{
    public interface ITaxPlanTransactionService
    {
        public void InsertTaxPlanTransaction(TaxPlanTransactionForFinancialYear taxPlanTransactionDto);
    }
}
