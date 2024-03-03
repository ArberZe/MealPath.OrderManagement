using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MealPath.OrderManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly IAsyncRepository<Author> _authorsRepository;

        public AuthorsController(IAsyncRepository<Author> authorsRepository)
        {
            _authorsRepository = authorsRepository;
        }

        [HttpGet("all", Name = "GetAllAuthors")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Author>>> GetAllAuthors()
        {
            var dtos = await _authorsRepository.ListAllAsync();
            return Ok(dtos);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> Create(CreateAuthorVm model)
        {
            var author = new Author
            {
                Name = model.Name,
                BirthYear = model.BirthYear
            };

            await _authorsRepository.AddAsync(author);

            return Ok(author);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Edit(int id, EditAuthorVm model)
        {
            var author = await _authorsRepository.GetByIdAsync(id);

            if(author == null) return NotFound();

            author.Name = model.Name;
            author.BirthYear = model.BirthYear;

            await _authorsRepository.UpdateAsync(author);

            return NoContent();
        }
    }

    public class CreateAuthorVm
    {
        public string Name { get; set; }
        public int BirthYear { get; set; }
    }

    public class EditAuthorVm
    {
        public string Name { get; set; }
        public int BirthYear { get; set; }
    }
}
