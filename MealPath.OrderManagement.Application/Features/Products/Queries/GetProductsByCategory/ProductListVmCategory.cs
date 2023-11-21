using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MealPath.OrderManagement.Application.Features.Products.Queries.GetProductsByCategory
{
    public class ProductListVmCategory
    {
        public int ProductID { get; set; }
        public string Title { get; set; } = String.Empty;
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public double Price { get; set; }
        public string ImageUrl { get; set; }
    }
}
