using Microsoft.AspNetCore.Identity;

namespace MealPath.OrderManagement.Identity.Models
{
    public class AppUser: IdentityUser
    {
        public string DisplayName { get; set; } = string.Empty;
    }
}
