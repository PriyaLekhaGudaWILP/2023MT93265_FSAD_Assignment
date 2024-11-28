using book_exchange_backend_1.Data;
using book_exchange_backend_1.Models;
using Microsoft.AspNetCore.Mvc;

namespace book_exchange_backend_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // Update user profile
        [HttpPut("updateProfile/{userId}")]
        public IActionResult UpdateProfile(int userId, User updatedUser)
        {
            var user = _context.Users.Find(userId);
            if (user == null)
                return NotFound(new { message = "User not found." });

            user.UserName = updatedUser.UserName;
            user.Email = updatedUser.Email;
            user.Password = updatedUser.Password;
            user.Age = updatedUser.Age;
            user.FavoriteGenre = updatedUser.FavoriteGenre;
            user.Location = updatedUser.Location;
            user.PhoneNumber = updatedUser.PhoneNumber;
            user.ReadingPreferences = updatedUser.ReadingPreferences;
            user.OwnedBooks = updatedUser.OwnedBooks;
            user.DesiredBooks = updatedUser.DesiredBooks;

            _context.SaveChanges();
            return Ok(new { message = "Profile updated successfully." });
        }

        // Get user profile
        [HttpGet("getProfile/{userId}")]
        public IActionResult GetProfile(int userId)
        {
            var user = _context.Users.Find(userId);
            if (user == null)
                return NotFound(new { message = "User not found." });

            return Ok(user);
        }
    }

}
