using BudgetBackend.Models.Classes;
using BudgetBackend.Services.Interfaces;
using System.Globalization;

namespace BudgetBackend.Services
{
    public class YearsandMonthsService : IYearsandMonthsService
    {
        private readonly IConfiguration _configuration;
        public YearsandMonthsService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<FinancialYear> GetFinancialYears()
        {
            var settingsNumberOfYears = _configuration["Settings:NumberOfYears"];
            var numberOfYears = !string.IsNullOrEmpty(settingsNumberOfYears) ? int.Parse(settingsNumberOfYears) : 0;
            List<FinancialYear> financialYears = new List<FinancialYear>();
            int currentYear = DateTime.Now.Year;
            int currentMonth = DateTime.Now.Month;

            for (int i = 0; i < numberOfYears; i++)
            {
                int startYear = currentYear - i;
                int endYear = startYear + 1;
                bool isCurrentFinancialYear = (currentMonth >= 4 && startYear == currentYear) || (currentMonth < 4 && endYear == currentYear);
                financialYears.Add(new FinancialYear
                {
                    FinancialYearName = $"{startYear}-{endYear}",
                    IsCurrentFinancialYear = isCurrentFinancialYear
                });
            }

            return financialYears;
        }

        public string[] GetMonths()
        {
            // Retrieve month names
            var months = CultureInfo.CurrentCulture.DateTimeFormat.MonthNames.ToList();
            var monthsList = months.Skip(3).ToList();
            monthsList.AddRange(months.Take(3));
            monthsList.RemoveAll(x => string.IsNullOrEmpty(x));

            return monthsList.ToArray();
        }
    }
}
