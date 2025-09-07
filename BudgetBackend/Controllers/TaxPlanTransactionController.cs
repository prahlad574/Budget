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
    }
}
