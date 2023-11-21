using AutoMapper;
using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsList;
using MealPath.OrderManagement.Domain.Entities;
using MediatR;

namespace MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsByCategory
{
    public class GetProductsByCategoryQueryHandler : IRequestHandler<GetProductsByCategoryQuery, List<ProductListVmCategory>>
    {
        private readonly IAsyncRepository<Product> _productRepository;
        private readonly IMapper _mapper;

        public GetProductsByCategoryQueryHandler(IAsyncRepository<Product> productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<List<ProductListVmCategory>> Handle(GetProductsByCategoryQuery request, CancellationToken cancellationToken)
        {
            var productsByCategory = (await _productRepository.ListAsync(p => p.CategoryId == request.CategoryId)).OrderByDescending(e => e.CreatedDate);
            return _mapper.Map<List<ProductListVmCategory>>(productsByCategory);
        }
    }
}