
using FluentValidation;


namespace MealPath.OrderManagement.Application.Features.Products.Commands.CreateProduct
{
   
    public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
    {
        public CreateProductCommandValidator()
        {
            RuleFor(p => p.Title)
                .NotEmpty().WithMessage("{PropertyName} eshte fushe e detyrueshme.")
                .NotNull()
                .MaximumLength(50).WithMessage("{PropertyName} nuk duhet te kaloje 50 karaktere.");

            RuleFor(p => p.Description)
                .NotEmpty().WithMessage("{PropertyName} eshte fushe e detyrueshme.")
                .NotNull()
                .MaximumLength(50).WithMessage("{PropertyName} nuk duhet te kaloje 255 karaktere.");

            RuleFor(p => p.ImageUrl)
                .NotEmpty().WithMessage("{PropertyName} eshte fushe e detyrueshme.")
                .NotNull()
                .MaximumLength(50).WithMessage("{PropertyName} nuk duhet te kaloje 50 karaktere.");

            RuleFor(p => p.CategoryId)
                .NotNull().WithMessage("{PropertyName} eshte fushe e detyrueshme.");

            RuleFor(p => p.Price)
                .NotNull().WithMessage("{PropertyName} eshte fushe e detyrueshme.");

        }
    }
}
