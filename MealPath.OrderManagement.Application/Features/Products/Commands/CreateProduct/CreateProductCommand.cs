using MediatR;
namespace MealPath.OrderManagement.Application.Features.Products.Commands.CreateProduct
{
    public class CreateProductCommand : IRequest<CreateProductCommandResponse>
    {
        public string Title { get; set; } = String.Empty;
        public string Description { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public double Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }
}
