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
        public async Task<IActionResult> AddTaxPlanForFinancialYear([FromBody]TaxPlanForFinancialYear taxPlanForFinancialYear)
        {
            var result = await _taxPlanForFinancialYearService.AddTaxPlanForFinancialYear(taxPlanForFinancialYear);
            if(result)
                return Ok();

            return BadRequest(result);
        }

        [HttpGet("GetTaxPlanForFinancialYear/{financialYear}")]
        public async Task<IEnumerable<TaxPlanForFinancialYear>> GetPlanForFinancialYear([FromRoute] string financialYear)
        {
            var result = await _taxPlanForFinancialYearService.GetTaxPlanForFinancialYear(financialYear);
            return result;
        }

        [HttpPut("UpdateTaxPlanForFinancialYear")]
        public async Task<IActionResult> UpdateTaxPlanForFinancialYear([FromBody] TaxPlanForFinancialYear taxPlanForFinancialYear)
        {
            var result = await _taxPlanForFinancialYearService.UpdateTaxPlanForFinancialYear(taxPlanForFinancialYear);
            if(result)
                return Ok();
            return NotFound();
        }
    
        [HttpDelete("DeleteTaxPlanForFinancialYear/{id}")]
        public async Task<IActionResult> DeleteTaxPlanForFinancialYear([FromRoute] Guid id)
        {
            var result = await _taxPlanForFinancialYearService.DeleteTaxPlanForFinancialYear(id);
            if (result)
                return Ok();

            return NotFound();
        }

    }
}
