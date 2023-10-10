using MediatR;

namespace MealPath.OrderManagement.Application.Features.Categories.Commands.CreateCategory
{
    public class CreateCategoryCommand: IRequest<CreateCategoryCommandResponse>
    {
        public string Name { get; set; } = String.Empty;
    }
}
