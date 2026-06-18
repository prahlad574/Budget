using BudgetBackend.Models.Classes;
using BudgetBackend.Repositories.Interfaces;
using BudgetBackend.Services.Interfaces;
using BudgetBackend.SignalR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace BudgetBackend.Services
{
    public class TaxPlanForFinancialYearService : ITaxPlanForFinancialYearService
    {
        private readonly ITaxPlanForFinancialYearRepository _taxPlanForFinancialYearRepository;
        private readonly IHubContext<BudgetHub> _budgetHubContext;
        public TaxPlanForFinancialYearService(ITaxPlanForFinancialYearRepository taxPlanForFinancialYearRepository, IHubContext<BudgetHub> budgetHubContext)
        {
            _taxPlanForFinancialYearRepository = taxPlanForFinancialYearRepository;
            _budgetHubContext = budgetHubContext;
        }

        public async Task<bool> AddTaxPlanForFinancialYear(TaxPlanForFinancialYear taxPlanForFinancialYear)
        {
            try
            {
                taxPlanForFinancialYear.TaxPlanForFinancialYearId = Guid.NewGuid();
                await _taxPlanForFinancialYearRepository.AddAsync(new Models.Entities.TaxPlanForFinancialYearEntity
                {
                    FinancialYear = taxPlanForFinancialYear.FinancialYear,
                    InvestmentName = taxPlanForFinancialYear.InvestmentName,
                    InvestingIn = taxPlanForFinancialYear.InvestingIn,
                    InvestmentAmount = taxPlanForFinancialYear.InvestmentAmount,
                    NoOfMonths = taxPlanForFinancialYear.NoOfMonths,
                    Section = taxPlanForFinancialYear.Section,
                    TaxPlanForFinancialYearId = (Guid)taxPlanForFinancialYear.TaxPlanForFinancialYearId
                });
                await _taxPlanForFinancialYearRepository.SaveChangesAsync();
                await _budgetHubContext.Clients.All.SendAsync($"TaxPlan-" + taxPlanForFinancialYear.FinancialYear, "TaxPlanAdded", taxPlanForFinancialYear);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<IEnumerable<TaxPlanForFinancialYear>> GetTaxPlanForFinancialYear(string financialYear)
        {
            try
            {
                var result = await _taxPlanForFinancialYearRepository.Find(x => x.FinancialYear == financialYear).ToListAsync();

                return result.Select(entity => new TaxPlanForFinancialYear
                {
                    TaxPlanForFinancialYearId = entity.TaxPlanForFinancialYearId,
                    FinancialYear = entity.FinancialYear,
                    InvestmentName = entity.InvestmentName,
                    InvestingIn = entity.InvestingIn,
                    InvestmentAmount = entity.InvestmentAmount,
                    NoOfMonths = entity.NoOfMonths,
                    Section = entity.Section
                });
            }
            catch (Exception ex)
            {
                // Handle exception as appropriate, e.g., log and return empty list
                return new List<TaxPlanForFinancialYear>();
            }
        }

        public async Task<bool> UpdateTaxPlanForFinancialYear(TaxPlanForFinancialYear taxPlanForFinancialYear)
        {
            try
            {
                if (taxPlanForFinancialYear.TaxPlanForFinancialYearId == null)
                {
                    return false; // Invalid ID
                }
                var existingEntity = await _taxPlanForFinancialYearRepository.GetByIdAsync(taxPlanForFinancialYear.TaxPlanForFinancialYearId);
                if (existingEntity == null)
                {
                    return false; // Entity not found
                }
                existingEntity.FinancialYear = taxPlanForFinancialYear.FinancialYear;
                existingEntity.InvestmentName = taxPlanForFinancialYear.InvestmentName;
                existingEntity.InvestingIn = taxPlanForFinancialYear.InvestingIn;
                existingEntity.InvestmentAmount = taxPlanForFinancialYear.InvestmentAmount;
                existingEntity.NoOfMonths = taxPlanForFinancialYear.NoOfMonths;
                existingEntity.Section = taxPlanForFinancialYear.Section;
                _taxPlanForFinancialYearRepository.Update(existingEntity);
                await _taxPlanForFinancialYearRepository.SaveChangesAsync();
                await _budgetHubContext.Clients.All.SendAsync($"TaxPlan-" + taxPlanForFinancialYear.FinancialYear, "TaxPlanUpdated", taxPlanForFinancialYear);
                return true;
            }
            catch (Exception ex)
            {
                return false; // Handle exception as appropriate
            }

        }

        public async Task<bool> DeleteTaxPlanForFinancialYear(Guid taxPlanForFinancialYearId)
        {
            try
            {
                var existingEntity = await _taxPlanForFinancialYearRepository.GetByIdAsync(taxPlanForFinancialYearId);
                if (existingEntity == null)
                {
                    return false; // Entity not found
                }

                _taxPlanForFinancialYearRepository.Delete(existingEntity);
                await _taxPlanForFinancialYearRepository.SaveChangesAsync();
                await _budgetHubContext.Clients.All.SendAsync($"TaxPlan-" + existingEntity.FinancialYear, "TaxPlanDeleted", taxPlanForFinancialYearId);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
