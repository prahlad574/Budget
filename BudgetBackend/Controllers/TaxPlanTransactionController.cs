using BudgetBackend.Models.Classes;
using BudgetBackend.Services;
using BudgetBackend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BudgetBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaxPlanTransactionController : ControllerBase
    {
        private readonly ITaxPlanTransactionService _taxPlanTransactionService;
        public TaxPlanTransactionController(ITaxPlanTransactionService taxPlanTransactionService)
        {
            _taxPlanTransactionService = taxPlanTransactionService;
        }
        // action method to insert a tax plan transaction

        [HttpPost("AddTaxPlanTransaction")]
        public async Task<IActionResult> AddTaxPlanTransactionForFinancialYear([FromBody] TaxPlanTransaction taxPlanTransactionDto)
        {
            // Call the service to insert the tax plan transaction
            var result = await _taxPlanTransactionService.InsertTaxPlanTransaction(taxPlanTransactionDto);
            if (!result)
                return BadRequest("Failed to insert tax plan transaction");

            return Ok();

        }

        [HttpGet("GetTransactionsForTaxplan/{taxPlanForFinancialyearID}")]
        public async Task<IActionResult> GetTransactionsForTaxplanForFinancialYearID([FromRoute] Guid taxPlanForFinancialyearID)
        {
            var result = await _taxPlanTransactionService.GetTransactionsForTaxplanForFinancialYearID(taxPlanForFinancialyearID);
           
            return Ok(result);

        }

        [HttpPut("UpdateTaxPlanTransaction")]
        public async Task<IActionResult> UpdateTaxPlanTransaction([FromBody] TaxPlanTransaction taxPlanTransaction)
        {
            var result = await _taxPlanTransactionService.UpdateTaxPlanTransaction(taxPlanTransaction);
            if (result)
                return Ok();
            return NotFound();
        }

        [HttpDelete("DeleteTaxPlanTransaction/{id}")]
        public async Task<IActionResult> DeleteTaxPlanTransaction([FromRoute] Guid id)
        {
            var result = await _taxPlanTransactionService.DeleteTaxPlanTransaction(id);
            if (result)
                return Ok();

            return NotFound();
        }
    }
}
