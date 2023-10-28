using MealPath.OrderManagement.Api.DTOs.Authentication;
using MealPath.OrderManagement.Identity.Models;
using MealPath.OrderManagement.Identity.Services;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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
                return new UserDto()
                {
                    DisplayName = user.DisplayName,
                    Image = "this will be image url",
                    Token = _tokenService.CreateTokem(user),
                    UserName = user.UserName
                };
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (await _userManager.FindByNameAsync(registerDto.UserName) != null) return BadRequest("Username is taken!");

            if (await _userManager.FindByEmailAsync(registerDto.Email) != null) return BadRequest("Email is taken!");


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
                return new UserDto()
                {
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Token = _tokenService.CreateTokem(user),
                    Image = "this is a url image"
                };
            }

            return BadRequest("A problem occurred while registering the user!");
        }
    }
}
