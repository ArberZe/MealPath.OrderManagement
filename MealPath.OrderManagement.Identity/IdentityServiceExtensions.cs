using MealPath.OrderManagement.Identity.Models;
using MealPath.OrderManagement.Identity.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
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

            services.AddIdentity<AppUser, IdentityRole>()
                .AddEntityFrameworkStores<MealPathIdentityDbContext>()
                .AddSignInManager<SignInManager<AppUser>>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            });

            services.AddScoped<TokenService>();

            //return services;
        }
    }
}
