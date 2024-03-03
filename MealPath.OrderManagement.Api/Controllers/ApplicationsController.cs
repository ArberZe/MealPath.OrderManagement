using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MealPath.OrderManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {
        private readonly IAsyncRepository<MealPath.OrderManagement.Domain.Entities.Application> _applicationsRepository;

        public ApplicationsController(IAsyncRepository<MealPath.OrderManagement.Domain.Entities.Application> applicationsRepository)
        {
            _applicationsRepository = applicationsRepository;
        }

        [HttpGet("all", Name = "GetAllApplications")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Domain.Entities.Application>>> GetAllApplications()
        {
            var dtos = await _applicationsRepository.ListAllAsync();
            return Ok(dtos);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> Create(CreateApplicationVm model)
        {
            var application = new MealPath.OrderManagement.Domain.Entities.Application
            {
                Date = model.Date,
                isActive = model.isActive,
                ApplicantId = model.ApplicantId
            };

            await _applicationsRepository.AddAsync(application);

            return Ok(application);
        }

        [HttpGet("date", Name ="GetApplicationsByDate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<Domain.Entities.Application>>> GetApplicationsByDate(string date)
        {
            var applications = (IEnumerable<Domain.Entities.Application>)(await _applicationsRepository.ListAllAsync());

            var filteredApplications = applications.Where(x => x.Date == date);

            if (!filteredApplications.Any()) return NotFound();

            return Ok(filteredApplications);
        }

        [HttpGet("applicant/{id}", Name = "GetApplicationsByApplicant")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<Domain.Entities.Application>>> GetApplicationsByApplicant(int id)
        {
            var applications = (IEnumerable<Domain.Entities.Application>)(await _applicationsRepository.ListAllAsync());

            var filteredApplications = applications.Where(x => x.ApplicantId == id);

            if (!filteredApplications.Any()) return NotFound();

            return Ok(filteredApplications);
        }


    }

    public class CreateApplicationVm
    {
        public string Date { get; set; }
        public bool isActive { get; set; }
        public int ApplicantId { get; set; }
    }
}
