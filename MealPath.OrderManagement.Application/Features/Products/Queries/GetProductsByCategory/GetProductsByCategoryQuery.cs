using MediatR;

namespace MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsByCategory
{
    public class GetProductsByCategoryQuery : IRequest<List<ProductListVmCategory>>
    {
        public int CategoryId { get; set; }
    }
}