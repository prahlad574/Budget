namespace BudgetBackend.Models.Classes
{
    public class FinancialYear
    {
        public required string FinancialYearName { get; set; }
        public bool IsCurrentFinancialYear { get; set; }
    }
}
