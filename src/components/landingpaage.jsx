import React from 'react';
import { Typography, Button, Box } from '@mui/material';

// Main App Component
export default function Landingpage() {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#FDF5F1',
      fontFamily: 'sans-serif' 
    }}>
      {/* Hero Section */}
      <Box 
        component="main"
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 16px', // Equivalent to py-20 px-4
          // Inline styles from before remain
          backgroundColor: '#374151', // Fallback color
          //backgroundImage: `url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop')`,
                    backgroundImage: `url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2070&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh', // Simplified to fill the whole screen
        }}
      >
        <Box sx={{ 
          position: 'relative', 
          zIndex: 10, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '4.5rem' }, // responsive text-5xl to text-7xl
              fontWeight: 800, // font-extrabold
              color: 'white',
              lineHeight: 1.25, // leading-tight
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'
            }}
          >
            Plan Your Success
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              marginTop: '32px', // mt-8
              backgroundColor: '#2563EB', // bg-blue-600
              '&:hover': {
                backgroundColor: '#1D4ED8', // hover:bg-blue-700
              },
              fontWeight: 'bold',
              borderRadius: '9999px', // rounded-full
              textTransform: 'none', // normal-case
              padding: '14px 40px',
              fontSize: '1rem'
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

