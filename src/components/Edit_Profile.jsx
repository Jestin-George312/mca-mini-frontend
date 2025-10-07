import React, { useState, useRef } from 'react'
import { Box, Button, Card, CardContent, Container, Grid, TextField, Typography, Avatar, IconButton } from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

const Edit_Profile = ({ onBack, onSave, initial }) => {
  const [form, setForm] = useState({
    name: initial?.name || 'Sophia Carter',
    email: initial?.email || 'sophia.carter@email.com',
    password: initial?.password || '********',
  })
  const [profileImage, setProfileImage] = useState(null)
  const fileInputRef = useRef(null)

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave?.(form)
  }

  return (
    <Container maxWidth={false} sx={{ mt: 0, px: { xs: 2, md: 6 } }}>
      <Box sx={{ p: { xs: 3, md: 5 }, background: 'linear-gradient(180deg, #eef2ff 0%, #ffffff 100%)' }}>
        <Button variant="outlined" onClick={onBack} sx={{ mb: 2 }}>← Back</Button>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Edit Profile</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Update your account details below.</Typography>

        <Card elevation={4} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ display:'flex', flexDirection:'column', gap: 2 }}>
              <Box sx={{ display:'flex', justifyContent:'center', mb: 1, position: 'relative' }}>
                <IconButton 
                  onClick={handleAvatarClick}
                  sx={{ 
                    p: 0,
                    position: 'relative',
                    '&:hover .camera-overlay': {
                      opacity: 1
                    }
                  }}
                >
                  <Avatar 
                    src={profileImage} 
                    sx={{ width: 72, height: 72 }}
                  >
                    {!profileImage && 'SJ'}
                  </Avatar>
                  <Box 
                    className="camera-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.2s ease-in-out',
                      cursor: 'pointer'
                    }}
                  >
                    <PhotoCameraIcon sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                </IconButton>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
                Click on the profile picture to upload a new image
              </Typography>
              
              <TextField label="Full Name" value={form.name} onChange={handleChange('name')} fullWidth />
              <TextField type="email" label="Email" value={form.email} onChange={handleChange('email')} fullWidth />
              <TextField type="password" label="Password" value={form.password} onChange={handleChange('password')} fullWidth />

              <Box sx={{ display:'flex', gap: 2 }}>
                <Button type="submit" variant="contained">Save Changes</Button>
                <Button variant="text" onClick={onBack}>Cancel</Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default Edit_Profile


