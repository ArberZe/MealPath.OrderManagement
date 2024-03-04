using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MealPath.OrderManagement.Application.Features.Products.Queries.GetProductList1
{
    public class ProductListVm1
    {
        public int ProductID { get; set; }
        public string Title { get; set; } = String.Empty;
        public string Description { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public double Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;

    }
}
