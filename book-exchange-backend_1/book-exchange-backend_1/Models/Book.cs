﻿namespace book_exchange_backend_1.Models
{
    public class Book
    {
        public int? Id { get; set; }
        public string? Title { get; set; }
        public string? Author { get; set; }
        public string? Genre { get; set; }
        public int? PublishedYear { get; set; }
        public string? Summary { get; set; }
        public string? Status { get; set; }
        public string? DeliveryMethod { get; set; }

    }

}
