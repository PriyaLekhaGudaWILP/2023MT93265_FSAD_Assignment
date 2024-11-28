namespace book_exchange_backend_1.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public int? Age { get; set; }
        public string? FavoriteGenre { get; set; }
        public string? Location { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ReadingPreferences { get; set; }
        public string? OwnedBooks { get; set; }
        public string? DesiredBooks { get; set; }
    }

}
