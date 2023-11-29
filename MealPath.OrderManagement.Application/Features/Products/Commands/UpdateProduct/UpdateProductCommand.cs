using MealPath.OrderManagement.Application.Features.Categories.Commands.UpdateCategory;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MealPath.OrderManagement.Application.Features.Products.Commands.UpdateProduct
{
    public class UpdateProductCommand : IRequest<UpdateProductCommandResponse>
    {
        public int ProductID { get; set; }
        public string Title { get; set; } = String.Empty;
        public string Description { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public double Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }
}
