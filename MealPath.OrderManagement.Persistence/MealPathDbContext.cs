using MealPath.OrderManagement.Domain.Common;
using MealPath.OrderManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MealPath.OrderManagement.Persistence
{
    public class MealPathDbContext : DbContext
    {
        public MealPathDbContext(DbContextOptions<MealPathDbContext> options) : base(options)
        {
        }



        public DbSet<Product> Products { get; set; } = default!;

        
        

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

            modelBuilder.Entity<Product>().HasData(new Product
            {
                ProductID = 1,
                Title = "Pizza Margarita",
                Description = "yes",
                CategoryId = 1,
                Price = 4.2,
                ImageUrl = "https://w7.pngwing.com/pngs/448/578/png-transparent-pizza-margherita-italian-cuisine-chicago-style-pizza-pepperoni-pizza-thumbnail.png",
                Status = true

            });
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedDate = DateTime.Now;
                        break;
                    case EntityState.Modified:
                        entry.Entity.LastModifiedDate = DateTime.Now;
                        break;
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }}
}
