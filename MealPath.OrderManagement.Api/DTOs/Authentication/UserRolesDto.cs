﻿namespace MealPath.OrderManagement.Api.DTOs.Authentication
{
    public class UserRolesDto
    {
        public string RoleId { get; set; } = string.Empty;
        public string RoleName { get; set; } = string.Empty;
        public bool IsSelected { get; set; }
    }
}