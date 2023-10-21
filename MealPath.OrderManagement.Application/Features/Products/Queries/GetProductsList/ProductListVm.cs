namespace MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsList
{
    public class ProductListVm
    {
        public int ProductID { get; set; }
        public string Title { get; set; } = String.Empty;
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public double Price { get; set; }
        public string ImageUrl { get; set; }

    }
}
