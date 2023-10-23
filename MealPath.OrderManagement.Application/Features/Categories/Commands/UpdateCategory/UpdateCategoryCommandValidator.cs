using FluentValidation;

namespace MealPath.OrderManagement.Application.Features.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommandValidator: AbstractValidator<UpdateCategoryCommand>
    {
        public UpdateCategoryCommandValidator()
        {
            RuleFor(p => p.Name)
            .NotEmpty().WithMessage("Category name is required.")
            .NotNull().WithMessage("Category name cannot be null")
            .MaximumLength(50).WithMessage("Category name cannot have more than 50 characters.");
        }
    }
}
