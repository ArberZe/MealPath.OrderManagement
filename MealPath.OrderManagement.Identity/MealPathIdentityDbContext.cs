using MealPath.OrderManagement.Identity.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MealPath.OrderManagement.Identity
{
    public class MealPathIdentityDbContext: IdentityDbContext<AppUser>
    {
        public MealPathIdentityDbContext(): base()
        {
            
        }

        public MealPathIdentityDbContext(DbContextOptions<MealPathIdentityDbContext> options) : base(options)
        {

        }
    }
}
