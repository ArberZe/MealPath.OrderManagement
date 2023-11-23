namespace MealPath.OrderManagement.Orders.Models
{
    public class CartItem
    {
        public int ProductID { get; set; }
        public string? Title { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
        public int Quantity { get; set; }
    }
}
