using BudgetBackend.Models.Classes;
using BudgetBackend.Repositories.Interfaces;
using BudgetBackend.Services.Interfaces;
using BudgetBackend.SignalR;
using Microsoft.AspNetCore.SignalR;

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
            _taxPlanForFinancialYearRepository.SaveChanges();
            _budgetHubContext.Clients.All.SendAsync($"TaxPlan-"+ taxPlanForFinancialYear.FinancialYear, "TaxPlanAdded",taxPlanForFinancialYear);
        }
    }
}
