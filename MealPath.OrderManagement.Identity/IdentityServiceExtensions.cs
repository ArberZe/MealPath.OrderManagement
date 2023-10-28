using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MealPath.OrderManagement.Identity
{
    public static class IdentityServiceExtensions
    {
        public static void AddIdentityServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<MealPathIdentityDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("MealPathIdentityConnectionString"),
                                                                    b => b.MigrationsAssembly(typeof(MealPathIdentityDbContext).Assembly.FullName)));
        }
    }
}
