﻿namespace MealPath.OrderManagement.Application.Exceptions
{
    public class AppException
    {
        public AppException(int statusCode, string message, string details)
        {
            StatusCode = statusCode;
            Message = message; 
            Details = details;
        }
        public int StatusCode { get; set; }
        public string Message { get; set; } = string.Empty;
        public string Details { get; set; } = string.Empty;
    }
}
