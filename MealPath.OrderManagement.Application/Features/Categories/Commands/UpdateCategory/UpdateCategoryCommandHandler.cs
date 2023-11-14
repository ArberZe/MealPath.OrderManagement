using AutoMapper;
using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Domain.Entities;
using MediatR;

namespace MealPath.OrderManagement.Application.Features.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, UpdateCategoryCommandResponse>
    {
        private readonly IAsyncRepository<Category> _categoryRepository;
        private readonly IMapper _mapper;

        public UpdateCategoryCommandHandler(IAsyncRepository<Category> categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<UpdateCategoryCommandResponse> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var updateCategoryCommandResponse = new UpdateCategoryCommandResponse();

            var validator = new UpdateCategoryCommandValidator();
            var validationResult = await validator.ValidateAsync(request);

            if(validationResult.Errors.Any())
            {
                updateCategoryCommandResponse.Success = false;
                updateCategoryCommandResponse.ValidationErrors = new List<string>();
                foreach(var error in validationResult.Errors)
                {
                    updateCategoryCommandResponse.ValidationErrors.Add(error.ErrorMessage);
                }
                updateCategoryCommandResponse.Message = "Validation of category failed!";
                return updateCategoryCommandResponse;
            }

            var categoryToUpdate = await _categoryRepository.GetByIdAsync(request.CategoryId);
            if(categoryToUpdate == null)
            {
                updateCategoryCommandResponse.Success = false;
                updateCategoryCommandResponse.Message = "Category with this id was not found";
                return updateCategoryCommandResponse;
                //throw new NotFoundException(nameof(Category), request.CategoryId);
            }

            _mapper.Map(request, categoryToUpdate, typeof(UpdateCategoryCommand), typeof(Category));

            await _categoryRepository.UpdateAsync(categoryToUpdate);
            updateCategoryCommandResponse.Message = "Category was updated successfully";
            return updateCategoryCommandResponse;
        }
    }
}
