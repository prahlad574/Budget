namespace BudgetBackend.Models.Classes
{
    public class TaxPlanTransaction
    {
        public Guid TaxPlanTransactionId { get; set; }

        public Guid TaxPlanForFinancialYearId { get; set; }

        public DateTime TransactionDate { get; set; }

        public int TransactionAmount { get; set; }
    }
}
