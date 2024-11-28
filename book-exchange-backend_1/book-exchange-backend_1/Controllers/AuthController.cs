using book_exchange_backend_1.Data;
using book_exchange_backend_1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace book_exchange_backend_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            // Find the user by email
            var user = _context.Users.FirstOrDefault(u => u.Email == loginDto.Email);
            if (user == null)
            {
                return Unauthorized(new { Message = "Invalid email or password" });
            }

            // Compare the hashed password (assuming passwords are hashed during registration)
            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
            {
                return Unauthorized(new { Message = "Invalid email or password" });
            }

            // Generate a dummy JWT token (replace with actual JWT token generation in production)
            var token = "dummy-jwt-token"; // Replace with a token generated using a library like System.IdentityModel.Tokens.Jwt

            return Ok(new
            {
                Message = "Login successful",
                Token = token,
                UserId = user.Id,
                Name = user.UserName
            });
        }


        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            // Check if the email already exists
            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return BadRequest(new { Message = "Email already in use" });
            }

            // Hash the password before saving
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new { Message = "User registered successfully" });
        }


    }

}
