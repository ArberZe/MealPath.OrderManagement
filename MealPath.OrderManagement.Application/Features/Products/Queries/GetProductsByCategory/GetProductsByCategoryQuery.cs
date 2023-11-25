using MediatR;
using System.Collections.Generic;

namespace MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsByCategory
{
    public class GetProductsByCategoryQuery : IRequest<List<ProductListVmCat>>
    {
        public int CategoryId { get; set; }
    }
}