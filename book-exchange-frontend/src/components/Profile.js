import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
  Tooltip
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile
    fetch('/api/User/getProfile/1004')
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
        setFormData(data); // Initialize form data for editing
      })
      .catch((error) => console.error('Error fetching profile:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProfile = () => {
    fetch('/api/User/UpdateProfile/1004', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to update profile');
        return response.json();
      })
      .then((updatedData) => {
        setProfileData(updatedData);
        setIsEditing(false); // Exit editing mode
        navigate('/profile', { state: { updatedProfile: updatedData } });
      })
      .catch((error) => console.error('Error updating profile:', error));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (!profileData) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
        <Avatar
          src={profileData.avatarUrl || ''}
          alt="Profile Avatar"
          sx={{ width: 100, height: 100, margin: '0 auto', mb: 2 }}
        />
        <Typography variant="h5" sx={{ mb: 2 }}>
          {profileData.name || 'Your Name'}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 4 }}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>

        {isEditing ? (
          <Box component="form" noValidate onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={2}>
              {Object.keys(formData).map((key) => (
                <Grid item xs={12} key={key}>
                  {key === 'password' ? (
                    <TextField
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData[key] || ''}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  ) : (
                    <TextField
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      name={key}
                      value={formData[key] || ''}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  )}
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              onClick={handleEditProfile}
            >
              Save Changes
            </Button>
          </Box>
        ) : (
          <Box>
            {Object.entries(profileData).map(([key, value]) => (
              <Typography key={key} sx={{ textAlign: 'left', mb: 1 }}>
                <strong>{key}:</strong> {key === 'password' ?
               <Typography sx={{ mb: 1 }}> ********
                <Tooltip title={'Please edit the profile to view the encryptged password'} arrow>
                  <InfoIcon sx={{verticalAlign: 'middle',pr:1, }} />
                </Tooltip> 
              </Typography>: value}                
              </Typography>
            ))}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ProfilePage;
