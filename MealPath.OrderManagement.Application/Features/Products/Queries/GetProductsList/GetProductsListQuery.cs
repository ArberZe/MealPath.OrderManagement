using MediatR;

namespace MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsList
{
    public class GetProductsListQuery : IRequest<List<ProductListVm>>
    {
    }
}
