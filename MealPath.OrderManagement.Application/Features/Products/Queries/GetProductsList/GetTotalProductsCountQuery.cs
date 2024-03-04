using MealPath.OrderManagement.Application.Contracts.Persistence;
using MediatR;

namespace MealPath.OrderManagement.Application.Features.Products.Queries.GetTotalProductsCount
{
    public class GetTotalProductsCountQuery : IRequest<int>
    {
    }

    public class GetTotalProductsCountQueryHandler : IRequestHandler<GetTotalProductsCountQuery, int>
    {
        private readonly IProductRepository _productRepository;

        public GetTotalProductsCountQueryHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<int> Handle(GetTotalProductsCountQuery request, CancellationToken cancellationToken)
        {
            return await _productRepository.GetTotalProductCountAsync();
        }
    }
}