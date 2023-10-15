using FluentValidation;

namespace MealPath.OrderManagement.Application.Features.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommandValidator: AbstractValidator<UpdateCategoryCommand>
    {
        public UpdateCategoryCommandValidator()
        {
            RuleFor(p => p.Name)
            .NotEmpty().WithMessage("{PropertyName} is required.")
            .NotNull().WithMessage("{PropertyMame} cannot be null")
            .MaximumLength(50).WithMessage("{PropertyName} cannot have more than 50 characters.");
        }
    }
}
