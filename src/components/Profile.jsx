import React, { useState, useEffect } from 'react'
import { Avatar, Box, Button, Card, CardContent, Container, Typography, Divider, CircularProgress, Alert } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Edit_Profile from './Edit_Profile'

// Helper function to get initials from a name
const getInitials = (name) => {
  if (!name) return 'U'; // Default User
  const parts = name.split(' ');
  return parts.map(part => part[0]).join('').toUpperCase();
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // State for user data
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile data on component load
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/auth/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data.');
        }
        
        const data = await response.json();
        setUserData(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array means this runs once on mount

  // This function will be called by Edit_Profile when a save is successful
  const handleSave = (updatedData) => {
    // Update the local state with the new data from the form
    setUserData(prevData => ({
      ...prevData,
      ...updatedData
    }));
    setIsEditing(false); // Go back to profile view
  };

  if (isEditing) {
    // Pass the current user data to the edit form
    return <Edit_Profile initial={userData} onBack={() => setIsEditing(false)} onSave={handleSave} />
  }

  if (loading) {
    return <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Container>
  }

  if (error) {
    return <Container sx={{ mt: 8 }}><Alert severity="error">{error}</Alert></Container>
  }

  if (!userData) {
    return <Container sx={{ mt: 8 }}><Alert severity="info">No user data found.</Alert></Container>
  }

  // Define account details based on fetched data
  const accountDetails = [
    { label: 'Full Name', value: userData.name },
    { label: 'Email address', value: userData.email },
    { label: 'Username', value: userData.username },
    { label: 'Password', value: '••••••••' }
  ];

  return (
    <Container maxWidth={false} sx={{ mt: 0, px: { xs: 2, md: 6 } }}>
      {/* Header Banner */}
      <Box sx={{
        p: { xs: 4, md: 8 },
        background: 'radial-gradient(1000px 500px at 20% -10%, rgba(123,97,255,0.15), transparent), radial-gradient(900px 500px at 80% 120%, rgba(62,166,255,0.18), transparent)',
        textAlign: 'center'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Profile</Typography>
        <Typography color="text.secondary">Manage your account details and preferences.</Typography>
      </Box>

      {/* Profile Card */}
      <Box sx={{ display:'flex', justifyContent:'center', mt: -4, mb: 6 }}>
        <Card elevation={6} sx={{ width: '100%', maxWidth: 720, borderRadius: 3 }}>
          <CardContent>
            {/* Top section with avatar and name */}
            <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', mb: 2 }}>
              <Box sx={{ display:'flex', alignItems:'center', gap: 2 }}>
                <Avatar sx={{ width: 64, height: 64 }}>
                  {getInitials(userData.name)}
                </Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>{userData.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{userData.email}</Typography>
                </Box>
              </Box>
              <Button variant="contained" size="small" startIcon={<EditIcon/>} onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Account Details */}
            <Typography sx={{ fontWeight: 700, mb: 1 }}>Account Details</Typography>
            {accountDetails.map((row) => (
              <Box key={row.label} sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', py: 1.5 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">{row.label}</Typography>
                  <Typography>{row.value}</Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default Profile