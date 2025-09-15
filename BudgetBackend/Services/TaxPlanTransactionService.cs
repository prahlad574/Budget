using BudgetBackend.Models.Classes;
using BudgetBackend.Models.Entities;
using BudgetBackend.Repositories.Interfaces;
using BudgetBackend.Services.Interfaces;

namespace BudgetBackend.Services
{
    public class TaxPlanTransactionService : ITaxPlanTransactionService
    {
        private readonly ITaxPlanTransactionRepository _taxPlanTransactionRepository;
        public TaxPlanTransactionService(ITaxPlanTransactionRepository taxPlanTransactionRepository)
        {
            _taxPlanTransactionRepository = taxPlanTransactionRepository;
        }
        public void InsertTaxPlanTransaction(TaxPlanTransactionForFinancialYear taxPlanTransactionDto)
        {
            _taxPlanTransactionRepository.AddAsync(new TaxPlanTransactionsEntity { 
                TaxPlanForFinancialYearId = taxPlanTransactionDto.TaxPlanForFinancialYearId,
                TaxPlanTransactionId = Guid.NewGuid(), // Generating new GUID for the transaction
                TransactionAmount = taxPlanTransactionDto.TransactionAmount, 
                TransactionDate = taxPlanTransactionDto.TransactionDate,
            });
            _taxPlanTransactionRepository.SaveChanges();
        }
    }
}
