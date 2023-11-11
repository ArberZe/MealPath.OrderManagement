﻿using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace MealPath.OrderManagement.Identity.Models
{
    [CollectionName("users")]
    public class AppUser: MongoIdentityUser<Guid>
    {
        public string DisplayName { get; set; } = string.Empty;
    }
}
