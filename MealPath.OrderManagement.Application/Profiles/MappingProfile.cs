﻿using AutoMapper;
using MealPath.OrderManagement.Application.Features.Categories.Commands.CreateCategory;
using MealPath.OrderManagement.Application.Features.Categories.Commands.UpdateCategory;
using MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoriesList;
using MealPath.OrderManagement.Application.Features.Categories.Queries.GetCategoryDetails;
using MealPath.OrderManagement.Domain.Entities;

namespace MealPath.OrderManagement.Application.Profiles
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<CategoryDetailsVm, Category>();
            CreateMap<Category, CreateCategoryDto>();
            CreateMap<Category, CategoryListVm>();
            CreateMap<Category, CategoryDetailsVm>();

            CreateMap<UpdateCategoryCommand, Category>();
        }
    }
}
