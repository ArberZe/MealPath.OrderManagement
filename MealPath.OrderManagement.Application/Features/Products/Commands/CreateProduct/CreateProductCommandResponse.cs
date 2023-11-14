using MealPath.OrderManagement.Application.Responses;

namespace MealPath.OrderManagement.Application.Features.Products.Commands.CreateProduct
{
    public class CreateProductCommandResponse : BaseResponse<CreateProductDto>
    {
        public CreateProductCommandResponse() : base()
        {

        }
        public CreateProductDto Product { get; set; } = default!;
    }
}
