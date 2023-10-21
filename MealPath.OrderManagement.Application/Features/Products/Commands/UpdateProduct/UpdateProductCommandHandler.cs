using AutoMapper;
using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Application.Features.Categories.Commands.UpdateCategory;
using MealPath.OrderManagement.Domain.Entities;
using MediatR;

namespace MealPath.OrderManagement.Application.Features.Products.Commands.UpdateProduct
{
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, UpdateProductCommandResponse>
    {
        private readonly IAsyncRepository<Product> _productRepository;
        private readonly IMapper _mapper;

        public UpdateProductCommandHandler(IAsyncRepository<Product> productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<UpdateProductCommandResponse> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var updateProductCommandResponse = new UpdateProductCommandResponse();

            var validator = new UpdateProductCommandValidator();
            var validationResult = await validator.ValidateAsync(request);

            if (validationResult.Errors.Any())
            {
                updateProductCommandResponse.Success = false;
                updateProductCommandResponse.ValidationErrors = new List<string>();
                foreach (var error in validationResult.Errors)
                {
                    updateProductCommandResponse.ValidationErrors.Add(error.ErrorMessage);
                }

                return updateProductCommandResponse;
            }

            var productToUpdate = await _productRepository.GetByIdAsync(request.ProductID);
            if (productToUpdate == null)
            {
                updateProductCommandResponse.Success = false;
                updateProductCommandResponse.Message = "Product with this id was not found";
                return updateProductCommandResponse;
                //throw new NotFoundException(nameof(Category), request.CategoryId);
            }

            _mapper.Map(request, productToUpdate, typeof(UpdateProductCommand), typeof(Product));

            await _productRepository.UpdateAsync(productToUpdate);
            updateProductCommandResponse.Message = "Product was updated successfully";
            return updateProductCommandResponse;
        }
    }
}
