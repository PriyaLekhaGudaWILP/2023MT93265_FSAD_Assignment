using book_exchange_backend_1.Data;
using book_exchange_backend_1.Models;
using Microsoft.AspNetCore.Mvc;

namespace book_exchange_backend_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExchangeRequestsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExchangeRequestsController(AppDbContext context)
        {
            _context = context;
        }

        // Create a new exchange request
        [HttpPost("create")]
        public IActionResult CreateExchangeRequests(ExchangeRequests request)
        {
            _context.ExchangeRequests.Add(request);
            _context.SaveChanges();
            return Ok(new { message = "Exchange request created successfully." });
        }

        // Get all exchange requests for a user
        [HttpGet("user/{userId}")]
        public IActionResult GetExchangeRequestssForUser(int userId)
        {
            var requests = _context.ExchangeRequests
                .Where(r => r.ReceiverUserId == userId || r.SenderUserId == userId)
                .ToList();
            return Ok(requests);
        }

        // Update exchange request status
        [HttpPut("update/{requestId}")]
        public IActionResult UpdateExchangeRequestsStatus(int requestId, [FromBody] string status)
        {
            var request = _context.ExchangeRequests.Find(requestId);
            if (request == null)
                return NotFound(new { message = "Exchange request not found." });

            request.Status = status;
            _context.SaveChanges();
            return Ok(new { message = "Exchange request updated successfully." });
        }
    }

}
