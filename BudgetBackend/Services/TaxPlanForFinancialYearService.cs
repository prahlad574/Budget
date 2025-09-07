using BudgetBackend.Models.Classes;
using BudgetBackend.Repositories.Interfaces;
using BudgetBackend.Services.Interfaces;

namespace BudgetBackend.Services
{
    public class TaxPlanForFinancialYearService : ITaxPlanForFinancialYearService
    {
        private readonly ITaxPlanForFinancialYearRepository _taxPlanForFinancialYearRepository;
        public TaxPlanForFinancialYearService(ITaxPlanForFinancialYearRepository taxPlanForFinancialYearRepository)
        {
            _taxPlanForFinancialYearRepository = taxPlanForFinancialYearRepository;
        }

        public void AddTaxPlanForFinancialYear(TaxPlanForFinancialYear taxPlanForFinancialYear)
        {
            taxPlanForFinancialYear.TaxPlanForFinancialYearId = Guid.NewGuid(); 
            _taxPlanForFinancialYearRepository.AddAsync(new Models.Entities.TaxPlanForFinancialYearEntity {
                FinancialYear = taxPlanForFinancialYear.FinancialYear,
                InvestmentName = taxPlanForFinancialYear.InvestmentName,
                InvestingIn = taxPlanForFinancialYear.InvestingIn,
                InvestmentAmount = taxPlanForFinancialYear.InvestmentAmount,
                NoOfMonths = taxPlanForFinancialYear.NoOfMonths,
                Section = taxPlanForFinancialYear.Section,
                TaxPlanForFinancialYearId = (Guid)taxPlanForFinancialYear.TaxPlanForFinancialYearId
            });
            _taxPlanForFinancialYearRepository.SaveChangesAsync();
        }
    }
}
