using AutoMapper;
using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoryDetails;
using MealPath.OrderManagement.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MealPath.OrderManagement.Application.Features.Products.Queries.GetProductDetails
{
     
    public class GetProductDetailsQueryHandler : IRequestHandler<GetProductDetailsQuery, GetProductDetailsQueryResponse>
    {
        private readonly IAsyncRepository<Product> _productRepository;
        private readonly IMapper _mapper;

        public GetProductDetailsQueryHandler(IMapper mapper, IAsyncRepository<Product> productRepository)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }
        public async Task<GetProductDetailsQueryResponse> Handle(GetProductDetailsQuery request, CancellationToken cancellationToken)
        {
            var getProductDetailsQueryResponse = new GetProductDetailsQueryResponse();

            var product = await _productRepository.GetByIdAsync(request.ProductID);
            var productDetailDto = _mapper.Map<ProductDetailsVm>(product);

            if (product != null)
            {
                getProductDetailsQueryResponse.Success = true;
                getProductDetailsQueryResponse.Product = productDetailDto;
                return getProductDetailsQueryResponse;
            }

            getProductDetailsQueryResponse.Success = false;
            getProductDetailsQueryResponse.Message = "Product not found!";

            return getProductDetailsQueryResponse;
        }
    }
}
