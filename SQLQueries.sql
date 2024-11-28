-- Create Database
CREATE DATABASE BookExchangeDB;
GO

USE BookExchangeDB;
GO

-- Create Books Table
CREATE TABLE Books (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Author NVARCHAR(255) NOT NULL,
    Genre NVARCHAR(100),
    PublishedDate DATETIME
);
GO

-- Create Users Table
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserName NVARCHAR(100) NOT NULL UNIQUE,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(50) NOT NULL
);
GO

-- Create Appointments Table
CREATE TABLE ExchangeRequests (
    Id INT PRIMARY KEY IDENTITY(1,1),
    SenderUserId INT NOT NULL,
    ReceiverUserId INT NOT NULL,
    BookId INT NOT NULL,
    Status NVARCHAR(50) NOT NULL DEFAULT 'Pending', -- Pending, Accepted, Rejected
    DeliveryMethod NVARCHAR(100), -- e.g., "In-person", "Courier"
    DurationDays INT, -- Negotiated loan duration
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (SenderUserId) REFERENCES Users(Id),
    FOREIGN KEY (ReceiverUserId) REFERENCES Users(Id),
    FOREIGN KEY (BookId) REFERENCES Books(Id)
);
GO

-- Create Profiles Table
CREATE TABLE Profiles (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT FOREIGN KEY REFERENCES Users(Id),
    FullName NVARCHAR(255),
    Profession NVARCHAR(100),
    Age INT,
    FavoriteGenre NVARCHAR(100),
    Location NVARCHAR(100),
    PhoneNumber NVARCHAR(15)
);
GO
