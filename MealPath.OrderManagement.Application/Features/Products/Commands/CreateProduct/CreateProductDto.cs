using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MealPath.OrderManagement.Application.Features.Products.Commands.CreateProduct
{
    public class CreateProductDto
    {
        public int ProductID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public double Price { get; set; }
        public string ImageUrl { get; set; }
    }
}
