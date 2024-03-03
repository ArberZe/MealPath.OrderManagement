using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MealPath.OrderManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoansController : ControllerBase
    {
        private readonly IAsyncRepository<Loan> _loanRepository;
        public LoansController(IAsyncRepository<Loan> loanRepository)
        {
            _loanRepository = loanRepository;
        }

        [HttpGet("all", Name = "GetAllLoans")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<List<Customer>>> GetAllLoans()
        {
            var dtos = await _loanRepository.ListAllAsync();
            return Ok(dtos);
        }

        [HttpPost(Name = "AddLoan")]
        public async Task<ActionResult> Create(CreateLoanVm model)
        {
            var loan = new Loan
            {
                Amount = model.Amount,
                Status = model.Status,
                IsDeleted = false,
                CustomerId = model.CustomerId
            };

            var response = await _loanRepository.AddAsync(loan);

            if (response == null) return BadRequest();

            return NoContent();
        }

        [HttpGet("status", Name = "GetLoansByStatus")]
        public async Task<ActionResult<IEnumerable<Loan>>> GetLoansByStatus(Status status)
        {
            var loans = (IEnumerable<Loan>)(await _loanRepository.ListAllAsync());
            var filteredLoans = loans.ToList().Where(x => x.Status == status && x.IsDeleted == false).OrderBy(x => x.Amount);
            if (filteredLoans.Any()) return Ok(filteredLoans);
            return NotFound();
        }

        [HttpGet("customer/{customerId}", Name = "GetCustomerLoans")]
        public async Task<ActionResult<IEnumerable<Loan>>> GetCustomerLoans(int customerId)
        {
            var loans = (IEnumerable<Loan>)(await _loanRepository.ListAllAsync());
            var filteredLoans = loans.ToList().Where(x => x.CustomerId == customerId && x.IsDeleted == false);
            if(filteredLoans.Any()) return Ok(filteredLoans);

            return NotFound();
        }
    }

    public class CreateLoanVm
    {
        public double Amount { get; set; }
        public Status Status { get; set; }
        public int CustomerId { get; set; }
    }
}
