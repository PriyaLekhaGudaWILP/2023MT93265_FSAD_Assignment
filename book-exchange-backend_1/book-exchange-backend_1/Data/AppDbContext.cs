using book_exchange_backend_1.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace book_exchange_backend_1.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<ExchangeRequests> ExchangeRequests { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(warnings =>
                warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed data for Users
            modelBuilder.Entity<User>().HasData(
                 new User
                 {
                     Id = 1,
                     UserName = "Priya Lekha",
                     Email = "priya@example.com",
                     Password = BCrypt.Net.BCrypt.HashPassword("password123"), // Secure password
                     Age = 25,
                     Location = "Hyderabad",
                     FavoriteGenre = "Mystery and Fiction",
                     DesiredBooks = "The Alchemist;1984" // Add appropriate value
                 }
            );

            // Seed data for Books
            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id = 1,
                    Title = "The Mystery of the Missing Code",
                    Author = "Jane Doe",
                    Genre = "Mystery",
                    PublishedYear = 2020,
                    Summary = "A thrilling mystery novel about a missing code that leads to hidden secrets.",
                    Status ="Pending",
                    DeliveryMethod= "Courier"
                },
                new Book
                {
                    Id = 2,
                    Title = "Fictional World",
                    Author = "John Smith",
                    Genre = "Fiction",
                    PublishedYear = 2018,
                    Summary = "An imaginative journey through a world of fiction and fantasy."
                }
            );
            modelBuilder.Entity<ExchangeRequests>().HasData(
               new ExchangeRequests
               {
                   Id = 1,
                   SenderUserId = 1,
                   ReceiverUserId = 2,
                   BookId = 1,
                   BookName= "The Catcher in the Rye",
                   Status = "Pending",
                   DeliveryMethod = "Courier",
                   DurationDays = 14,
                   CreatedAt = DateTime.Now
               },
               new ExchangeRequests
               {
                   Id = 2,
                   SenderUserId = 2,
                   ReceiverUserId = 1,
                   BookId = 2,
                   BookName= "To Kill a Mockingbird",
                   Status = "Accepted",
                   DeliveryMethod = "In-person",
                   DurationDays = 7,
                   CreatedAt = DateTime.Now.AddDays(-3)
               }
           );
        }
    }
}