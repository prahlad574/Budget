using BudgetBackend.Models.Classes;
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

        [HttpPost("AddTaxPlanTransactionForFinancialYear")]
        public IActionResult AddTaxPlanTransactionForFinancialYear([FromBody] TaxPlanTransactionForFinancialYear taxPlanTransactionDto)
        {
            // Call the service to insert the tax plan transaction
            _taxPlanTransactionService.InsertTaxPlanTransaction(taxPlanTransactionDto);
            return Ok("Tax plan transaction inserted successfully");

        }
    }
}
