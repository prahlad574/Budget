using BudgetBackend.Models.Classes;

namespace BudgetBackend.Services.Interfaces
{
    public interface IYearsandMonthsService
    {
        List<FinancialYear> GetFinancialYears();
        string[] GetMonths();
    }
}
