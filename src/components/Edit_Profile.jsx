import React, { useState } from 'react'
import { Box, Button, Card, CardContent, Container, Grid, TextField, Typography, Avatar } from '@mui/material'

const Edit_Profile = ({ onBack, onSave, initial }) => {
  const [form, setForm] = useState({
    name: initial?.name || 'Sophia Carter',
    email: initial?.email || 'sophia.carter@email.com',
    password: initial?.password || '********',
  })

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value })

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
              <Box sx={{ display:'flex', justifyContent:'center', mb: 1 }}>
                <Avatar sx={{ width: 72, height: 72 }}>SJ</Avatar>
              </Box>

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


