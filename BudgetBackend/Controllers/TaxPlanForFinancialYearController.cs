using BudgetBackend.Models.Classes;
using BudgetBackend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BudgetBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaxPlanForFinancialYearController : ControllerBase
    {
        private readonly ITaxPlanForFinancialYearService _taxPlanForFinancialYearService;

        public TaxPlanForFinancialYearController(ITaxPlanForFinancialYearService taxPlanForFinancialYearService)
        {
            _taxPlanForFinancialYearService = taxPlanForFinancialYearService;
        }

        [HttpPost("AddTaxPlanForFinancialYear")]
        public IActionResult AddTaxPlanForFinancialYear([FromBody]TaxPlanForFinancialYear taxPlanForFinancialYear)
        {
            _taxPlanForFinancialYearService.AddTaxPlanForFinancialYear(taxPlanForFinancialYear);
            return Ok();
        }
    }
}
