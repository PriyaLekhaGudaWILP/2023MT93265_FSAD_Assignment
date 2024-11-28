using book_exchange_backend_1.Data;
using book_exchange_backend_1.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace book_exchange_backend_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProfileController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult GetProfile(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return NotFound(new { Message = "User not found" });

            return Ok(new
            {
                Name = user.UserName,
                Age = user.Age,
                Profession = "Software",
                Location = user.Location,
                FavoriteGenre = user.FavoriteGenre,
                PhoneNumber = "9999999999",
                RecentAppointments = new[] { "Book Discussion", "Library Visit" }
            });
        }
    }
}
