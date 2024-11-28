namespace book_exchange_backend_1.Models
{
    public class ExchangeRequests
    {
        public int? Id { get; set; }
        public int? SenderUserId { get; set; }
        public int? ReceiverUserId { get; set; }
        public int? BookId { get; set; }
        public string? BookName { get; set; }
        public string? Status { get; set; } = "Pending";
        public string? DeliveryMethod { get; set; }
        public int? DurationDays { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
    }

}
