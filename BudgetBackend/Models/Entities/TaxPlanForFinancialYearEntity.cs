using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetBackend.Models.Entities
{
    [Table("TaxPlanForFinancialYear")]
    public class TaxPlanForFinancialYearEntity
    {
        [Required]
        [Key]
        [Column("TaxPlanForFinancialYearID")]
        public Guid TaxPlanForFinancialYearId { get; set; }

        [Required]
        [Column("FinancialYear")]
        public required string FinancialYear { get; set; }

        [Required]
        [Column("InvestmentName")]
        public required string InvestmentName { get; set; }

        [Column("InvestmentAmount")]
        public int InvestmentAmount { get; set; }

        [Column("NoOfMonths")]
        public int NoOfMonths { get; set; }

        [Column("Section")]
        public string? Section { get; set; }

        [Column("InvestingIn")]
        public string? InvestingIn { get; set; }
    }
}
