﻿namespace book_exchange_backend_1.Models
{
    public class LoginDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}