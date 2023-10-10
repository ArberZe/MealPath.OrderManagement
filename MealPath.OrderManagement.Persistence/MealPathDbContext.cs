using MealPath.OrderManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MealPath.OrderManagement.Persistence
{
    public class MealPathDbContext : DbContext
    {
        public MealPathDbContext(DbContextOptions<MealPathDbContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(MealPathDbContext).Assembly);

            modelBuilder.Entity<Category>().HasData(new Category
            {
                CategoryId = 1,
                Name = "Ushqim"
            });

            modelBuilder.Entity<Category>().HasData(new Category
            {
                CategoryId = 2,
                Name = "Pije"
            });
        }
    }
}
