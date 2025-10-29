import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Edit_Profile = ({ onBack, onSave, initial }) => {
  // Use initial prop for state, default to empty strings
  const [form, setForm] = useState({
    name: initial?.name || '',
    email: initial?.email || '',
    password: '', // Password field should always start empty
  });
  
  const [profileImage, setProfileImage] = useState(null); // Avatar logic is separate
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleImageUpload = (e) => {
    // ... (your existing image upload logic) ...
  };

  const handleAvatarClick = () => {
    // ... (your existing avatar click logic) ...
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // 1. Prepare payload - only send changed data
    const payload = {};
    const initialName = initial?.name || '';
    const initialEmail = initial?.email || '';

    if (form.name.trim() && form.name !== initialName) {
      payload.name = form.name; // <-- ADDED THIS
    }
    if (form.email.trim() && form.email !== initialEmail) {
      payload.email = form.email;
    }
    if (form.password.trim()) {
      payload.password = form.password;
    }

    // 2. If nothing changed, just show a message
    if (Object.keys(payload).length === 0) {
      setSuccess("No changes to save.");
      setLoading(false);
      setTimeout(() => onBack?.(), 1500);
      return;
    }

    // 3. Get auth token
    const token = localStorage.getItem("access");
    if (!token) {
      setError("Authentication error. Please log in again.");
      setLoading(false);
      return;
    }

    // 4. Make the API call
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/update-profile/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update profile.');
      }

      setSuccess('Profile updated successfully!');
      
      // Call onSave prop with the new data
      // This tells the parent (Profile.jsx) to update its state
      onSave?.(form); 
      
      // Go back after a delay
      setTimeout(() => onBack?.(), 1500); // onBack is passed from props

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} sx={{ mt: 0, px: { xs: 2, md: 6 } }}>
      <Box sx={{ p: { xs: 3, md: 5 }, background: 'linear-gradient(180deg, #eef2ff 0%, #ffffff 100%)' }}>
        <Button variant="outlined" onClick={onBack} disabled={loading} sx={{ mb: 2 }}>
          <ArrowBackIcon sx={{ mr: 0.5, fontSize: '1rem' }} /> Back
        </Button>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Edit Profile</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Update your account details below.</Typography>

        <Card elevation={4} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              
              {/* ... (Your existing Image Upload UI) ... */}
              
              {/* Alerts for feedback */}
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              {/* Form Fields */}
              <TextField 
                label="Full Name" 
                value={form.name} 
                onChange={handleChange('name')} 
                fullWidth 
                disabled={loading} 
              />
              <TextField 
                type="email" 
                label="Email" 
                value={form.email} 
                onChange={handleChange('email')} 
                fullWidth 
                disabled={loading} 
              />
              <TextField 
                type="password" 
                label="New Password" 
                value={form.password} 
                onChange={handleChange('password')} 
                placeholder="Leave blank to keep current password"
                fullWidth 
                disabled={loading} 
              />

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button variant="text" onClick={onBack} disabled={loading}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default Edit_Profile;