using MediatR;

namespace MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoriesList
{
    public class GetCategoriesListQuery: IRequest<List<CategoryListVm>>
    {
    }
}
