using MealPath.OrderManagement.Application.Features.Products.Commands.CreateProduct;
using MealPath.OrderManagement.Application.Responses;

namespace MealPath.OrderManagement.Application.Features.Categories.Commands.CreateCategory
{
    public class CreateCategoryCommandResponse: BaseResponse<CreateCategoryDto>
    {
        public CreateCategoryCommandResponse(): base()
        {
            
        }
        public CreateCategoryDto Category { get; set; } = default!;
    }
}
