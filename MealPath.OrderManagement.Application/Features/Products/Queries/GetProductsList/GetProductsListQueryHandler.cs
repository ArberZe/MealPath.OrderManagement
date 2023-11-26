
using AutoMapper;
using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Domain.Entities;
using MediatR;

namespace MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsList
{
    public class GetProductsListQueryHandler : IRequestHandler<GetProductsListQuery, List<ProductListVm>>
    {
        private readonly IAsyncRepository<Product> _productRepository;
        private readonly IMapper _mapper;

        public GetProductsListQueryHandler(IAsyncRepository<Product> productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<List<ProductListVm>> Handle(GetProductsListQuery request, CancellationToken cancellationToken)
        {
            var pageSize = request.PageSize > 0 ? request.PageSize : 10;
            var pageNumber = request.Page > 0 ? request.Page : 1;

            var allProducts = await _productRepository.GetPagedReponseAsync(pageNumber, pageSize);

            return _mapper.Map<List<ProductListVm>>(allProducts.data);
        }
    }

}