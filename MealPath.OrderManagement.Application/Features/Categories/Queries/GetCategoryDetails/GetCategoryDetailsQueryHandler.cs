using AutoMapper;
using MediatR;
using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Domain.Entities;

namespace MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoryDetails
{
    public class GetCategoryDetailsQueryHandler : IRequestHandler<GetCategoryDetailsQuery, GetCategoryDetailsQueryResponse>
    {
        private readonly IAsyncRepository<Category> _categoryRepository;
        private readonly IMapper _mapper;

        public GetCategoryDetailsQueryHandler(IMapper mapper, IAsyncRepository<Category> categoryRepository)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }
        public async Task<GetCategoryDetailsQueryResponse> Handle(GetCategoryDetailsQuery request, CancellationToken cancellationToken)
        {
            var getCategoryDetailsQueryResponse = new GetCategoryDetailsQueryResponse();

            var category = await _categoryRepository.GetByIdAsync(request.CategoryId);
            var categoryDetailDto = _mapper.Map<CategoryDetailsVm>(category);

            if (category != null)
            {
                getCategoryDetailsQueryResponse.Success = true;
                getCategoryDetailsQueryResponse.Category = categoryDetailDto;
                return getCategoryDetailsQueryResponse;
            }

            getCategoryDetailsQueryResponse.Success = false;
            getCategoryDetailsQueryResponse.Message = "Category not found!";

            return getCategoryDetailsQueryResponse;
        }
    }
}
