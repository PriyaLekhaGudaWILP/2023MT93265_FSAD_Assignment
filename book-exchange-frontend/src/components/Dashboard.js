import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar,Menu, Avatar, IconButton,Button, Typography, Box, Container, TextField, Alert,Select, MenuItem,FormControl, InputLabel, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const DashboardPage = () => {
  const navigate = useNavigate();
  
  // Form state for adding a new book
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    price: ''
  });

  const [exchangeRequest, setExchangeRequest] = useState(null); // Holds the created exchange request details
  const [openForm, setOpenForm] = useState(false);
  const [showExchangeRequests, setShowExchangeRequests] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); // State to toggle book listing form visibility
  const [books, setBooks] = useState([]);
  const [date, setDate] = useState('');
  const formattedDate = `${date}T15:20:31.69`
  const [formData, setFormData] = useState({
    senderUserId:'',
    receiverUserId:'',
    bookId:'',
    bookName: '',
    status: '',
    deliveryMethod: '',
    durationDays: '',
    createdAt: formattedDate
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Open the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose(); // Close the menu
    navigate('/profile'); // Navigate to the profile route
  };


  useEffect(() => {
    const fetchExchangeRequests = async () => {
      try {
        const exchangeResponse = await axios.get('/api/ExchangeRequests/user/1');
        setShowExchangeRequests(exchangeResponse.data); // Set the fetched data
      } catch (error) {
        console.error('Error fetching exchange requests:', error);
      }
    };

    fetchExchangeRequests();
  }, []);

  // Handle input change for the new book form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  


  // Handle form submission for adding a new book
  const handleAddBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Make the POST request to add a new book
      const response = await axios.post('/api/Book', newBook);
      setLoading(false);
      setSuccess(true);
      setNewBook({
        title: '',
        author: '',
        genre: '',
        description: '',
        price: ''
      });
    } catch (error) {
      setLoading(false);
      setError('Failed to add the book. Please try again.');
    }
  };

  const handleExchangeSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call API to submit the exchange request
      const response = await axios.post('/api/ExchangeRequests/create', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      // Once the request is successful, store the response data in exchangeRequest
      setExchangeRequest(response.data);
      setOpenForm(false); // Close the form
      setFormData({ senderUserId: '', receiverUserId: '',bookId:'', bookName: '', status: '', deliveryMethod: '', durationDays:'', createdAt:'' }); // Reset form
    } catch (error) {
      console.error('Error submitting exchange request:', error);
    }
  };

  return (
    <>
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        {/* Left-Aligned Title */}
        <Typography variant="h6" align='center' sx={{ flexGrow: 1 }}>
        Welcome to the Dashboard
        </Typography>

        {/* Right-Aligned Account Menu */}
        <Box>
        <IconButton
        onClick={handleMenuOpen}
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ bgcolor: 'secondary.main' }}>P</Avatar>
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
      </Menu>
        </Box>
      </Toolbar>
    </AppBar>
    <Container maxWidth="md">      
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Button to navigate to the Book Listing page */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/books')}
          sx={{ mb: 2 }}
        >
          View the list of books
        </Button>

        {/* Button to list a new book */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowForm(!showForm)} // Toggle the form visibility
          sx={{ mb: 2 }}
        >
          {showForm ? 'Cancel' : 'List a New Book'}
        </Button>

        {/* Conditional form to add a new book */}
        {showForm && (
          <Box sx={{ mt: 2, width: '100%' }}>
            <Typography variant="h6" gutterBottom>Enter Book Details</Typography>
            <form onSubmit={handleAddBook}>
              <TextField
                label="Title"
                name="title"
                value={newBook.title}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Author"
                name="author"
                value={newBook.author}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
              />
              
              <TextField
                label="Genre"
                name="genre"
                value={newBook.genre}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Description"
                name="summary"
                value={newBook.summary}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Published Year"
                name="publishedYear"
                value={newBook.publishedYear}
                onChange={handleInputChange}
                fullWidth
                required
                type="number"
                margin="normal"
              />
              <FormControl fullWidth required margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                name="status"
                value={newBook.status}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
                label="status"
                >                
                  <MenuItem value="exchanged">Exchanged</MenuItem>
                  <MenuItem value="intransit">In Transit</MenuItem>
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="notavailable">Not Available</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required margin="normal">
                <InputLabel>Delivery Method</InputLabel>
                <Select
                name="deliveryMethod"
                value={newBook.deliveryMethod}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
                label="deliveryMethod"
                >                
                  <MenuItem value="Courier">Courier</MenuItem>
                  <MenuItem value="meetInPerson">Meet in person</MenuItem>
                </Select>
              </FormControl>

              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mt: 2 }}>Book added successfully!</Alert>}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? 'Adding Book...' : 'Add Book'}
              </Button>
            </form>
          </Box>
        )}

        {/* Button to navigate to the Exchange Requests page */}
        <Button variant="contained" color="primary" onClick={() => setOpenForm(!openForm)} sx={{ mb: 2 }}>
          {openForm ? 'Cancel' : 'Request Exchange'}
        </Button>

        {/* Show form if openForm is true */}
        {openForm && (
          <form onSubmit={handleExchangeSubmit}>
            
             
            <TextField
              label="Sender User Id"
              name="senderUserId"
              value={formData.senderUserId}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />  
            <TextField
              label="Receiver User Id"
              name="receiverUserId"
              value={formData.receiverUserId}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />     
            <TextField
              label="Book Id"
              name="bookId"
              value={formData.bookId}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />   
            <TextField
              label="Book Title"
              name="bookName"
              value={formData.bookName}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />      
            {/* Status Dropdown */}
            <FormControl fullWidth required margin="normal">
              <InputLabel>Exchange Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                label="Exchange Status"
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="In Transit">In Transit</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth required margin="normal">
                <InputLabel>Delivery Method</InputLabel>
                <Select
                name="deliveryMethod"
                value={formData.deliveryMethod}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
                label="deliveryMethod"
                >                
                  <MenuItem value="Courier">Courier</MenuItem>
                  <MenuItem value="meetInPerson">Meet in person</MenuItem>
                </Select>
              </FormControl>
              <TextField
              label="No of days to exchange"
              name="durationDays"
              value={formData.durationDays}
              onChange={handleInputChange}
              fullWidth
              required
              type="number"
              margin="normal"
            />    
            <TextField
            label="Select Date"
            type="date"
            value={date}
            onChange={handleDateChange}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginBottom: 2 }}
          />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Submit Request
            </Button>
          </form>
        )}

        {/* Display the exchange request card once it's submitted */}
        <br/><br/><Typography variant='h6'>The list of books exchanged by you so far</Typography>
        <Grid container spacing={2} sx={{ padding: 2 }}>          
          {showExchangeRequests.map((request) => (
            <Grid item xs={12} sm={6} md={4} key={request.id}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {request.bookName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Sender User ID:</strong> {request.senderUserId}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Receiver User ID:</strong> {request.receiverUserId}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Book ID:</strong> {request.bookId}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Status:</strong> {request.status}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Delivery Method:</strong> {request.deliveryMethod}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Duration:</strong> {request.durationDays} days
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Created At:</strong> {new Date(request.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
    </Grid>

  </Box>
</Container>
    </>

  );
};

export default DashboardPage;

