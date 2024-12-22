using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetBackend.Models.Entities
{
    [Table("TaxPlanTransactions")]
    public class TaxPlanTransactionsEntity
    {
        [Key]
        [Column("TaxPlanTransactionID")]
        [Required]
        public Guid TaxPlanTransactionId { get; set; }

        [Column("TaxPlanForFinancialYearID")]
        [Required]
        public Guid TaxPlanForFinancialYearId { get; set; }

        [Column("TransactionDate")]
        [Required]
        public DateTime TransactionDate { get; set; }

        [Column("TransactionAmount")]
        [Required]
        public int TransactionAmount { get; set; }
    }
}
