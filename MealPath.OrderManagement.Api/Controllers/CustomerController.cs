using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Application.Features.Categories.Commands.CreateCategory;
using MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoriesList;
using MealPath.OrderManagement.Domain.Entities;
using MealPath.OrderManagement.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MealPath.OrderManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IAsyncRepository<Customer> _customerRepository;
        public CustomerController(IAsyncRepository<Customer> customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpGet("all", Name = "GetAllCustomers")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<List<Customer>>> GetAllCustomers()
        {
            var dtos = await _customerRepository.ListAllAsync();
            return Ok(dtos.Where(x => x.IsDeleted == false));
        }

        [HttpPost(Name = "AddCustomer")]
        public async Task<ActionResult> Create(CreateSuctomerVm model)
        {
            var customer = new Customer
            {
                Name = model.Name,
                IsActive = model.IsActive,
                IsDeleted = false
            };
            var response = await _customerRepository.AddAsync(customer);

            if (response == null) return BadRequest(); 

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var customerToDelete = await _customerRepository.GetByIdAsync(id);
            if(customerToDelete == null) return NotFound();
            customerToDelete.IsDeleted = true;
            await _customerRepository.UpdateAsync(customerToDelete);
            return NoContent();   
        }
    }

    public class CreateSuctomerVm
    {
        public string Name { get; set; }
        public bool IsActive { get; set; }
    }
}
