using MealPath.OrderManagement.Application.Responses;

namespace MealPath.OrderManagement.Application.Features.Products.Queries.GetProductDetails
{
    public class GetProductDetailsQueryResponse : BaseResponse
    {

        public GetProductDetailsQueryResponse() : base()
        {

        }

        public ProductDetailsVm Product { get; set; } = default!;
    }
}
