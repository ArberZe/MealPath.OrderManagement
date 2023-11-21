using MealPath.OrderManagement.Application.Features.Categories.Commands.CreateCategory;
using MealPath.OrderManagement.Application.Features.Categories.Commands.UpdateCategory;
using MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoriesList;
using MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoryDetails;
using MealPath.OrderManagement.Application.Features.Products.Commands.CreateProduct;
using MealPath.OrderManagement.Application.Features.Products.Commands.UpdateProduct;
using MealPath.OrderManagement.Application.Features.Products.Queries.GetProductDetails;
using MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsByCategory;
using MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsList;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductListVm = MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsList.ProductListVm;

namespace MealPath.OrderManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("all", Name = "GetAllProducts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [AllowAnonymous]
        public async Task<ActionResult<List<ProductListVm>>> GetAllProducts()
        {
            var dtos = await _mediator.Send(new GetProductsListQuery());
            return Ok(dtos);
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetProductById")]
        public async Task<ActionResult<GetProductDetailsQueryResponse>> GetProductById(int id)
        {
            var response = await _mediator.Send(new GetProductDetailsQuery() { ProductID = id });
            return Ok(response);
        }

        [HttpPut(Name = "UpdateProduct")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<UpdateProductCommand>> Update([FromBody] UpdateProductCommand updateProductCommand)
        {
            var response = await _mediator.Send(updateProductCommand);
            return Ok(response);
        }

        [HttpPost(Name = "AddProduct")]
        public async Task<ActionResult<CreateProductCommandResponse>> Create([FromBody] CreateProductCommand createProductCommand)
        {
            var response = await _mediator.Send(createProductCommand);
            return Ok(response);
        }


        [HttpGet("ByCategory/{categoryId}", Name = "GetProductsByCategory")]
        [AllowAnonymous]
        public async Task<ActionResult<List<ProductListVm>>> GetProductsByCategory(int categoryId)
        {
            var dtos = await _mediator.Send(new GetProductsByCategoryQuery { CategoryId = categoryId });
            return Ok(dtos);
        }


    }
}
