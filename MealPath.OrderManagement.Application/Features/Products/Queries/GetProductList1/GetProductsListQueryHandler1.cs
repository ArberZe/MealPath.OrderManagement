using AutoMapper;
using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoriesList;
using MealPath.OrderManagement.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MealPath.OrderManagement.Application.Features.Products.Queries.GetProductList1
{
    public class GetProductQueryHandler1 : IRequestHandler<GetProductListQuery1, List<ProductListVm1>>
    {
        private readonly IAsyncRepository<Product> _productRepository;
        private readonly IMapper _mapper;

        public GetProductQueryHandler1(IAsyncRepository<Product> productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<List<ProductListVm1>> Handle(GetProductListQuery1 request, CancellationToken cancellationToken)
        {
            var allProducts = (await _productRepository.ListAllAsync()).OrderByDescending(e => e.CreatedDate);
            return _mapper.Map<List<ProductListVm1>>(allProducts);
        }
    }
}
