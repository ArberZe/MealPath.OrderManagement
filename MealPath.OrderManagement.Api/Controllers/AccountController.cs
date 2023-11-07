using MealPath.OrderManagement.Api.DTOs.Authentication;
using MealPath.OrderManagement.Identity.Models;
using MealPath.OrderManagement.Identity.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace MealPath.OrderManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (await _userManager.FindByNameAsync(registerDto.UserName) != null) 
            {
                ModelState.AddModelError("Username", "Username is taken");
                return ValidationProblem();
            }

            if (await _userManager.FindByEmailAsync(registerDto.Email) != null)
            {
                ModelState.AddModelError("Email", "Email is taken");
                return ValidationProblem();
            }


            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName,
                EmailConfirmed = true
            };


            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (result.Succeeded)
            {
                //_signInManager.SignInAsync(user, request.Password);
                return CreateUserObject(user);
            }

            return BadRequest("A problem occurred while registering the user!");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = "",
                Token = _tokenService.CreateTokem(user),
                UserName = user.UserName
            };
        }
    }
}
