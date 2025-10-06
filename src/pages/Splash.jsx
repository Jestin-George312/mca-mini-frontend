import React, { useState, useMemo } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';

// 1. Import the getTheme function instead of the static theme object
import getTheme from '../theme'; 

import Splash_navbar from '../components/splash_navbar';
import Hero1_splash from '../components/hero1_splash';
import Hero_features from '../components/hero_features';

const Splash = () => {
  // 2. Manage the theme mode state ('light' or 'dark')
  const [mode, setMode] = useState('light'); // Default to light mode

  // Function to pass down to the navbar to toggle the mode
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // 3. Create the theme object dynamically based on the current mode
  // useMemo ensures the theme is only recalculated when the mode changes
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    // 4. Use the MUI ThemeProvider and provide the dynamic theme
    <ThemeProvider theme={theme}>
      {/* CssBaseline applies background colors and base styles from your theme */}
      <CssBaseline />
      
      {/* 5. Use Box for better layout control instead of a generic div */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensure the layout takes at least the full viewport height
      }}>
        {/* Pass the mode and toggle function to your navbar */}
        <Splash_navbar mode={mode} toggleColorMode={toggleColorMode} />
        
        {/* Your main content sections */}
        <main>
          <Hero1_splash />
          <Hero_features />
        </main>
      </Box>
    </ThemeProvider>
  );
};

export default Splash;