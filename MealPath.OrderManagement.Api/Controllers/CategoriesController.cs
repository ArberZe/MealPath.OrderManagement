using MealPath.OrderManagement.Application.Features.Categories.Commands.CreateCategory;
using MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoriesList;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoryDetails;
using MealPath.OrderManagement.Application.Features.Categories.Commands.UpdateCategory;

namespace MealPath.OrderManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CategoryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("all", Name = "GetAllCategories")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [AllowAnonymous]
        public async Task<ActionResult<List<CategoryListVm>>> GetAllCategories()
        {
            var dtos = await _mediator.Send(new GetCategoriesListQuery());
            return Ok(dtos);
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetCategoryById")]
        public async Task<ActionResult<GetCategoryDetailsQueryResponse>> GetProductById(int id)
        {
            var response = await _mediator.Send(new GetCategoryDetailsQuery() { CategoryId = id }); 
            return Ok(response);
        }

        [HttpPut(Name = "UpdateCategory")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<UpdateCategoryCommandResponse>> Update([FromBody] UpdateCategoryCommand updateProductCommand)
        {
            var response = await _mediator.Send(updateProductCommand);
            return Ok(response);
        }

        [HttpPost(Name = "AddCategory")]
        public async Task<ActionResult<CreateCategoryCommandResponse>> Create([FromBody] CreateCategoryCommand createCategoryCommand)
        {
            var response = await _mediator.Send(createCategoryCommand);
            return Ok(response);
        }
    }
}