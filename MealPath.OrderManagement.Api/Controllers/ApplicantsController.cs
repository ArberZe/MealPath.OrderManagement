using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MealPath.OrderManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicantsController : ControllerBase
    {
        private readonly IAsyncRepository<Applicant> _applicantsRepository;
        public ApplicantsController(IAsyncRepository<Applicant> applicantsRepository)
        {
            _applicantsRepository = applicantsRepository;
        }

        [HttpGet("all", Name = "GetAllApplicants")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Applicant>>> GetAllApplicants()
        {
            var dtos = await _applicantsRepository.ListAllAsync();
            return Ok(dtos);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> Create(CreateApplicantVm model)
        {
            var applicant = new Applicant
            {
                Fullname = model.Fullname,
                isDeleted = false
            };

            await _applicantsRepository.AddAsync(applicant);

            return Ok(applicant);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var applicantToDelete = await _applicantsRepository.GetByIdAsync(id);
            if (applicantToDelete == null) return NotFound();
            applicantToDelete.isDeleted = true;
            await _applicantsRepository.UpdateAsync(applicantToDelete);
            return NoContent();
        }
    }

    public class CreateApplicantVm
    {
        public string Fullname { get; set; } = string.Empty;
    }
}
