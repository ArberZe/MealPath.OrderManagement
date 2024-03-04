using MealPath.OrderManagement.Application.Responses;

namespace MealPath.OrderManagement.Application.Features.Products.Commands.DeleteProduct
{
    public class DeleteProductCommandResponse : BaseResponse<DeleteProductResult>
    {
        public DeleteProductCommandResponse() : base()
        {
        }
    }

    public class DeleteProductResult
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}