using MediatR;

namespace MealPath.OrderManagement.Application.Features.Products.Commands.DeleteProduct
{
    public class DeleteProductCommand : IRequest<DeleteProductCommandResponse>
    {
        public int ProductId { get; set; }
    }
}