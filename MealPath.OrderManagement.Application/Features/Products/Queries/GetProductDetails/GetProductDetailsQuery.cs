using MediatR;

namespace MealPath.OrderManagement.Application.Features.Products.Queries.GetProductDetails
{
    public class GetProductDetailsQuery : IRequest<GetProductDetailsQueryResponse>
    {

        public int ProductID { get; set; }
    }
}
    