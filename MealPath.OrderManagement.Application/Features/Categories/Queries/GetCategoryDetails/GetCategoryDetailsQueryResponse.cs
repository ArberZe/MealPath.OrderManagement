using MealPath.OrderManagement.Application.Responses;

namespace MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoryDetails
{
    public class GetCategoryDetailsQueryResponse: BaseResponse
    {
        public GetCategoryDetailsQueryResponse(): base()
        {
            
        }

        public CategoryDetailsVm Category { get; set; } = default!;
    }
}
