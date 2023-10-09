using AutoMapper;
using MediatR;
using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Domain.Entities;

namespace MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoryDetails
{
    public class GetCategoryDetailsQueryHandler : IRequestHandler<GetCategoryDetailsQuery, CategoryDetailsVm>
    {
        private readonly IAsyncRepository<Category> _categoryRepository;
        private readonly IMapper _mapper;

        public GetCategoryDetailsQueryHandler(IMapper mapper, IAsyncRepository<Category> categoryRepository)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }
        public async Task<CategoryDetailsVm> Handle(GetCategoryDetailsQuery request, CancellationToken cancellationToken)
        {
            var category = await _categoryRepository.GetByIdAsync(request.CategoryId);
            return _mapper.Map<CategoryDetailsVm>(category);
        }
    }
}
