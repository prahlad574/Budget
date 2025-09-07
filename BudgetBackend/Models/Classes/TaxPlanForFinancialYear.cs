namespace BudgetBackend.Models.Classes
{
    public class TaxPlanForFinancialYear
    {
        public Guid? TaxPlanForFinancialYearId { get; set; }
        public required string FinancialYear { get; set; }
        public required string InvestmentName { get; set; }
        public int InvestmentAmount { get; set; }
        public int NoOfMonths { get; set; }
        public string? Section { get; set; }
        public string? InvestingIn { get; set; }
    }
}
