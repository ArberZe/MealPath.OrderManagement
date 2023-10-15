using MediatR;

namespace MealPath.OrderManagement.Application.Features.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommand: IRequest<UpdateCategoryCommandResponse>
    {
        public int CategoryId { get; set; }
        public string Name { get; set; } = string.Empty;

    }
}
