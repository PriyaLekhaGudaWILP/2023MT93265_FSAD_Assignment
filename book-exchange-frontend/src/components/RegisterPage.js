import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Container, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // Added Confirm Password field
    age: '',
    favoriteGenre: '',
    location: '',
    phoneNumber: '',
    readingPreferences: '',
    ownedBooks: '',
    desiredBooks: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Check if password and confirm password match
    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/Auth/register', user);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setError('Registration failed. Please try again.');
    }
  };

  // Go back to login page
  const goToLogin = () => {
    navigate('/login'); // This will redirect to the login page
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography align="center" variant="h3">Welcome to the Book Exchange Platform!</Typography><br/>
        <Typography align="center" variant="h4">Please Register Here</Typography>
        
        {!success ? (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Name"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              type="email"
            />
            <TextField
              label="Password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              type="password"
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              type="password"
            />
            <TextField
              label="Age"
              name="age"
              value={user.age}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Favorite Genre"
              name="favoriteGenre"
              value={user.favoriteGenre}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Location"
              name="location"
              value={user.location}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Reading Preferences"
              name="readingPreferences"
              value={user.readingPreferences}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Owned Books"
              name="ownedBooks"
              value={user.ownedBooks}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Desired Books"
              name="desiredBooks"
              value={user.desiredBooks}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Alert severity="success" sx={{ mb: 2 }}>
              User successfully registered!
            </Alert>
            <Button variant="contained" color="primary" onClick={goToLogin}>
              Go to Login
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default RegistrationPage;
