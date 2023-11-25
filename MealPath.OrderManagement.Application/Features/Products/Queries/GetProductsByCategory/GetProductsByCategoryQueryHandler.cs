using AutoMapper;
using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Domain.Entities;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsByCategory
{
    public class GetProductsByCategoryQueryHandler : IRequestHandler<GetProductsByCategoryQuery, List<ProductListVmCat>>
    {
        private readonly IAsyncRepository<Product> _productRepository;
        private readonly IMapper _mapper;

        public GetProductsByCategoryQueryHandler(IAsyncRepository<Product> productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<List<ProductListVmCat>> Handle(GetProductsByCategoryQuery request, CancellationToken cancellationToken)
        {
            var products = (await _productRepository.ListAsync(x => x.CategoryId == request.CategoryId)).OrderByDescending(e => e.CreatedDate);
            return _mapper.Map<List<ProductListVmCat>>(products);
        }
    }
}