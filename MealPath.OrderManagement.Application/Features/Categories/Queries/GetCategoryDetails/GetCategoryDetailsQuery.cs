using MediatR;

namespace MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoryDetails
{
    public class GetCategoryDetailsQuery: IRequest<CategoryDetailsVm>
    {
        public int CategoryId { get; set; }
    }
}
