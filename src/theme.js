// path: ../../theme.js

import { createTheme } from "@mui/material";

// This function returns a theme based on the provided mode ('light' or 'dark')
const getTheme = (mode) => createTheme({
  palette: {
    mode, // This is the key that sets the mode
    ...(mode === 'light'
      ? {
          // Palette values for light mode
          primary: {
            main: '#1976d2', // A standard blue for light mode
          },
          secondary: {
            main: '#dc004e',
          },
          background: {
            default: '#f4f6f8',
            paper: '#ffffff',
          },
        }
      : {
          // Palette values for dark mode
          primary: {
            main: '#3ea6ff',
          },
          secondary: {
            main: '#f48fb1',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
        }),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
});

export default getTheme;