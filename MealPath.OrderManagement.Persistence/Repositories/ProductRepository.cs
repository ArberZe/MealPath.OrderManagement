using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MealPath.OrderManagement.Persistence.Repositories
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(MealPathDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IReadOnlyList<Product>> ListProductsByCreatedDateDescending()
        {
            var allProducts = await _dbContext.Products.ToListAsync();
            return allProducts.OrderByDescending(e => e.CreatedDate).ToList();
        }

    }
}
