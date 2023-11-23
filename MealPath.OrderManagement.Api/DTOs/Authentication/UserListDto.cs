﻿namespace MealPath.OrderManagement.Api.DTOs.Authentication
{
    public class UserListDto
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public List<string> Roles{ get; set; }
    }
}