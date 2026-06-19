using BudgetBackend.Models.Classes;
using BudgetBackend.Models.Entities;
using BudgetBackend.Repositories.Interfaces;
using BudgetBackend.Services.Interfaces;
using BudgetBackend.SignalR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace BudgetBackend.Services
{
    public class TaxPlanTransactionService : ITaxPlanTransactionService
    {
        private readonly IHubContext<BudgetHub> _budgetHubContext;
        private readonly ITaxPlanTransactionRepository _taxPlanTransactionRepository;
        public TaxPlanTransactionService(ITaxPlanTransactionRepository taxPlanTransactionRepository, IHubContext<BudgetHub> budgetHubContext)
        {
            _taxPlanTransactionRepository = taxPlanTransactionRepository;
            _budgetHubContext = budgetHubContext;
        }

        public async Task<IEnumerable<TaxPlanTransaction>> GetTransactionsForTaxplanForFinancialYearID(Guid taxPlanForFinancialyearID)
        {
            try
            {
                var result = await _taxPlanTransactionRepository.Find(x => x.TaxPlanForFinancialYearId == taxPlanForFinancialyearID).ToListAsync();

                return result.Select(entity => new TaxPlanTransaction
                {
                    TaxPlanTransactionId = entity.TaxPlanTransactionId,
                    TaxPlanForFinancialYearId = entity.TaxPlanForFinancialYearId,
                    TransactionAmount = entity.TransactionAmount,
                    TransactionDate = entity.TransactionDate
                });
            }
            catch (Exception ex)
            {
                // Log the exception (you can use a logging framework like Serilog, NLog, etc.)
                Console.WriteLine($"Error retrieving tax plan transactions: {ex.Message}");
                return Enumerable.Empty<TaxPlanTransaction>(); // Return an empty list on failure

            }
        }

        public async Task<bool> InsertTaxPlanTransaction(TaxPlanTransaction taxPlanTransactionDto)
        {
            try
            {
                taxPlanTransactionDto.TaxPlanTransactionId = Guid.NewGuid(); // Generating new GUID for the transaction
                await _taxPlanTransactionRepository.AddAsync(new TaxPlanTransactionsEntity
                {
                    TaxPlanForFinancialYearId = taxPlanTransactionDto.TaxPlanForFinancialYearId,
                    TaxPlanTransactionId = taxPlanTransactionDto.TaxPlanTransactionId,
                    TransactionAmount = taxPlanTransactionDto.TransactionAmount,
                    TransactionDate = taxPlanTransactionDto.TransactionDate,
                });
                await _taxPlanTransactionRepository.SaveChangesAsync();
                var key = $"TaxPlanTransaction-" + taxPlanTransactionDto.TaxPlanForFinancialYearId;
                await _budgetHubContext.Clients.All.SendAsync(key, "TaxPlanTransactionAdded", taxPlanTransactionDto);
                return true;

            }
            catch (Exception ex)
            {
                // Log the exception (you can use a logging framework like Serilog, NLog, etc.)
                Console.WriteLine($"Error inserting tax plan transaction: {ex.Message}");
                return false; // Indicate failure
            }
        }

        public async Task<bool> UpdateTaxPlanTransaction(TaxPlanTransaction taxPlanTransaction)
        {
            try
            {
                var entity = await _taxPlanTransactionRepository.GetByIdAsync(taxPlanTransaction.TaxPlanTransactionId);
                if (entity == null)
                    return false;
                entity.TransactionAmount = taxPlanTransaction.TransactionAmount;
                entity.TransactionDate = taxPlanTransaction.TransactionDate;
                _taxPlanTransactionRepository.Update(entity);
                await _taxPlanTransactionRepository.SaveChangesAsync();
                var key = $"TaxPlanTransaction-" + taxPlanTransaction.TaxPlanForFinancialYearId;
                await _budgetHubContext.Clients.All.SendAsync(key, "TaxPlanTransactionUpdated", taxPlanTransaction);
                return true;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error updating tax plan transaction: {ex.Message}");
                return false; // Indicate failure
            }
        }

        public async Task<bool> DeleteTaxPlanTransaction(Guid id)
        {
            try
            {
                var entity = await _taxPlanTransactionRepository.GetByIdAsync(id);
                if (entity == null)
                    return false;
                _taxPlanTransactionRepository.Delete(entity);
                await _taxPlanTransactionRepository.SaveChangesAsync();
                var key = $"TaxPlanTransaction-" + entity.TaxPlanForFinancialYearId;
                await _budgetHubContext.Clients.All.SendAsync(key, "TaxPlanTransactionDeleted", id);
                return true;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error deleting tax plan transaction: {ex.Message}");
                return false; // Indicate failure
            }
        }
    }
}
