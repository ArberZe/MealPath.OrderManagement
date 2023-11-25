using MealPath.OrderManagement.Application.Features.Categories.Commands.CreateCategory;
using MealPath.OrderManagement.Application.Features.Categories.Commands.UpdateCategory;
using MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoriesList;
using MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoryDetails;
using MealPath.OrderManagement.Application.Features.Products.Commands.CreateProduct;
using MealPath.OrderManagement.Application.Features.Products.Commands.DeleteProduct;
using MealPath.OrderManagement.Application.Features.Products.Commands.UpdateProduct;
using MealPath.OrderManagement.Application.Features.Products.Queries.GetProductDetails;
using MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsByCategory;
using MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsList;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        //[HttpGet("all", Name = "GetAllProducts")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[AllowAnonymous]
        //public async Task<ActionResult<List<ProductListVm>>> GetAllProducts([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        //{
        //    var products = await _mediator.Send(new GetProductsListQuery());

        //    // Pagination
        //    var totalCount = products.Count;
        //    var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
        //    var paginatedProducts = products.Skip((page - 1) * pageSize).Take(pageSize).ToList();

        //    var response = new
        //    {
        //        TotalCount = totalCount,
        //        TotalPages = totalPages,
        //        CurrentPage = page,
        //        PageSize = pageSize,
        //        Data = paginatedProducts
        //    };

        //    return Ok(response);
        //}

        [HttpGet("all", Name = "GetAllProducts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [AllowAnonymous]
        public async Task<ActionResult<List<ProductListVm>>> GetAllProducts(int page = 1, int pageSize = 10)
        {
            var query = new GetProductsListQuery { Page = page, PageSize = pageSize };
            var dtos = await _mediator.Send(query);
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


        [HttpDelete("{id}", Name = "DeleteProduct")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<DeleteProductCommandResponse>> Delete(int id)
        {
            var response = await _mediator.Send(new DeleteProductCommand { ProductId = id });

            if (!response.Success)
            {
                return NotFound();
            }

            return NoContent();
        }


        [HttpGet("byCategory/{categoryId}", Name = "GetProductsByCategory")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [AllowAnonymous]
        public async Task<ActionResult<List<ProductListVm>>> GetProductsByCategory(int categoryId)
        {
            var dtos = await _mediator.Send(new GetProductsByCategoryQuery { CategoryId = categoryId });
            return Ok(dtos);
        }


    }
}
