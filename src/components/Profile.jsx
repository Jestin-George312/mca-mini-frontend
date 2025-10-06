import React, { useState } from 'react'
import { Avatar, Box, Button, Card, CardContent, Container, Grid, Typography, Divider, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Edit_Profile from './Edit_Profile'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return <Edit_Profile onBack={() => setIsEditing(false)} onSave={() => setIsEditing(false)} />
  }

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
                <Avatar sx={{ width: 64, height: 64 }}>SJ</Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>Sophia Carter</Typography>
                  <Typography variant="body2" color="text.secondary">sophia.carter@email.com</Typography>
                </Box>
              </Box>
              <Button variant="contained" size="small" startIcon={<EditIcon/>} onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Account Details */}
            <Typography sx={{ fontWeight: 700, mb: 1 }}>Account Details</Typography>
            {[{ label:'Name', value:'Sophia Carter' }, { label:'Email address', value:'sophia.carter@email.com' }, { label:'Password', value:'••••••••' }].map((row) => (
              <Box key={row.label} sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', py: 1.5 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">{row.label}</Typography>
                  <Typography>{row.value}</Typography>
                </Box>
              </Box>
            ))}

            {/* Preferences removed as requested */}
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default Profile


