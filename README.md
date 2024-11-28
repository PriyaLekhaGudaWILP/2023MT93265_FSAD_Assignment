# 2023MT93265_FSAD_Assignment
This is the repository for Full stack Development course for BITS WILP program
# Full-Stack Book Exchange Application
This is a full-stack Book Exchange platform where users can list, search, and request exchanges of books. The application includes a frontend built with React and a backend built with .NET Framework 4.8. It also integrates with a database (SQL Server) to store and manage users, books, and exchanges.

Front end runs on localhost:3000
Backend runs on localhost:5243 (Please append swagger at the end for testing)

## Table of Contents
1.Project Overview
2.Features
3.Technologies
4.Prerequisites
5.Frontend Setup
6.Backend Setup
7.Database Setup
8.Running the Application

## Project Overview

The Book Exchange Application is designed to help users exchange books. Users can:
- Search for books by title, author, or genre.
- Request book exchanges from other users.
- Manage their profile and book listings.
- Admins can manage user accounts, books, and exchange requests.

## Features
- **User Authentication**: Users can register, log in, and manage their profiles.
- **Book Listings**: Users can list books they want to exchange, and search for books by various filters.
- **Exchange Requests**: Users can send and receive book exchange requests.
- **Admin Dashboard**: Admins can manage users, books, and exchanges.

## Technologies
- **Frontend**: React, React Router, Axios, Material-UI (for styling)
- **Backend**: .NET Framework 4.8, ASP.NET Web API, SQL Server (for data storage)
- **Authentication**: JWT (JSON Web Tokens) for user authentication

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js**: For running the frontend
- **.NET Framework 4.8**: For running the backend
- **SQL Server**: For storing data
- **Postman** (optional): For testing API endpoints

### **Frontend Setup (React)**

1. **Install Dependencies**:
   Navigate to the `frontend/` directory and run the following command:
   ```bash
   npm install
   This will run the frontend on http://localhost:3000.

### **Backend Setup (.NET Framework)**
1. Install Dependencies
2. Update Connection Strings in the appsettings.json file.
3. Run the application using Visual Studio or the .NET CLI: using dotnet run

### **Database Setup (SQL Server)**
1. Create the Database in SQL Server Management Studio and create a new database named BookExchangeDb.
2. Run the SQL scripts to create the necessary tables.
