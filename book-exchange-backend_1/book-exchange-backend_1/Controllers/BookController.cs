using book_exchange_backend_1.Data;
using book_exchange_backend_1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace book_exchange_backend_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetBooks()
        {
            var books = _context.Books.ToList();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public IActionResult GetBookById(int id)
        {
            var book = _context.Books.FirstOrDefault(b => b.Id == id);
            if (book == null)
                return NotFound(new { Message = "Book not found" });
            return Ok(book);
        }

        [HttpPost]
        public IActionResult AddBook([FromBody] Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data.");
            }

            // Ensure `Id` is not set explicitly
           /* book.Id = 0;*/

            _context.Books.Add(book);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetBookById), new { id = book.Id }, book);
        }

    }
}
