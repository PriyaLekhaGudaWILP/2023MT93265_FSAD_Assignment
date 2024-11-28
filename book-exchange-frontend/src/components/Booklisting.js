import React, { useEffect, useState } from "react";
import { TextField, Container, Grid, Card, CardContent, Typography } from "@mui/material";

const BookListing = () => {
  const [allBooks, setAllBooks] = useState([]); // Holds all the books fetched from the API
  const [books, setBooks] = useState([]); // Holds filtered books
  const [searchKeyword, setSearchKeyword] = useState(""); // Search input value

  // Fetch books from the API when the component loads
  useEffect(() => {
    fetch("/api/Book")
      .then((response) => response.json())
      .then((data) => {
        setAllBooks(data); // Save all books
        setBooks(data); // Initially display all books
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  // Filter books as the searchKeyword changes
  useEffect(() => {
    const filteredBooks = allBooks.filter((book) =>
      book.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setBooks(filteredBooks); // Update displayed books
  }, [searchKeyword, allBooks]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Book Listing
      </Typography>

      {/* Search Bar */}
      <Grid container spacing={2} style={{ marginBottom: "20px" }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Search by Title"
            variant="outlined"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Book Listing */}
      <Grid container spacing={3}>
        {books.length > 0 ? (
          books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography color="textSecondary"><b>Author: </b>{book.author}</Typography>
                  <Typography variant="body2"><b>Description:</b> {book.summary}</Typography>
                  <Typography variant="body2"><b>Genre: </b>{book.genre}</Typography>
                  <Typography variant="body2"><b>Published year:</b> {book.publishedYear}</Typography>
                  <Typography variant="body2"><b>Status:</b> {book.status}</Typography>
                  <Typography variant="body2"><b>Delivery method:</b> {book.deliveryMethod}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="textSecondary">
            No books found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default BookListing;
