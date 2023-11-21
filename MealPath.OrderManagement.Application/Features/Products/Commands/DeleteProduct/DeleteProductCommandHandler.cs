using MediatR;
using System.Threading;
using System.Threading.Tasks;
using MealPath.OrderManagement.Application.Contracts.Persistence;

namespace MealPath.OrderManagement.Application.Features.Products.Commands.DeleteProduct
{
    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, DeleteProductCommandResponse>
    {
        private readonly IProductRepository _productRepository;

        public DeleteProductCommandHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<DeleteProductCommandResponse> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            var response = new DeleteProductCommandResponse();

            // Check if the product exists
            var product = await _productRepository.GetByIdAsync(request.ProductId);

            if (product == null)
            {
                response.Value = new DeleteProductResult { Success = false, Message = "Product with this id was not found" };
                return response;
            }

            // Perform the delete operation
            await _productRepository.DeleteAsync(product);

            response.Value = new DeleteProductResult { Success = true, Message = "Product was deleted successfully" };
            return response;
        }
    }
}