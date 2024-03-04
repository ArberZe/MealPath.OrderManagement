using FluentValidation;

namespace MealPath.OrderManagement.Application.Features.Products.Commands.UpdateProduct
{
   
    public class UpdateProductCommandValidator : AbstractValidator<UpdateProductCommand>
    {
        public UpdateProductCommandValidator()
        {
            RuleFor(p => p.Title)
                .NotEmpty().WithMessage("{PropertyName} eshte fushe e detyrueshme.")
                .NotNull()
                .MaximumLength(50).WithMessage("{PropertyName} nuk duhet te kaloje 50 karaktere.");

            RuleFor(p => p.Description)
                .NotEmpty().WithMessage("{PropertyName} eshte fushe e detyrueshme.")
                .NotNull()
                .MaximumLength(255).WithMessage("{PropertyName} nuk duhet te kaloje 255 karaktere.");

            RuleFor(p => p.ImageUrl)
                .NotEmpty().WithMessage("{PropertyName} eshte fushe e detyrueshme.")
                .NotNull()
                .MaximumLength(255).WithMessage("{PropertyName} nuk duhet te kaloje 50 karaktere.");

            RuleFor(p => p.CategoryId)
                .NotNull().WithMessage("{PropertyName} eshte fushe e detyrueshme.");

            RuleFor(p => p.Price)
                .NotNull().WithMessage("{PropertyName} eshte fushe e detyrueshme.");
        }
    }
}
