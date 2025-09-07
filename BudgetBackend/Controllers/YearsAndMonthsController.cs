using BudgetBackend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BudgetBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class YearsAndMonthsController : ControllerBase
    {
        private readonly IYearsandMonthsService _yearsandMonthsService;
        public YearsAndMonthsController(IYearsandMonthsService yearsandMonthsService)
        {
            _yearsandMonthsService = yearsandMonthsService;
        }

        [HttpGet]
        [Route("/GetFinancialYears")]
        public IActionResult GetFinancialYears()
        {
            return Ok(_yearsandMonthsService.GetFinancialYears());
        }

        [HttpGet]
        [Route("/GetMonths")]
        public IActionResult GetMonths()
        {
            return Ok(_yearsandMonthsService.GetMonths());
        }
    }
}
