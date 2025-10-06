import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Stud_navbar = ({ activeView, setActiveView }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // Redirect to login
    navigate("/login");
  };
  const renderNavButton=(label,view)=>(
  <Button variant={activeView===view?'contained':'outlined'} 
  onClick={()=>{setActiveView(view)}}
  >
  {label}
  </Button>
  )

  return (
    <AppBar position="sticky" color="default">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6">Student Dashboard</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {renderNavButton('Home', 'home')}
          {renderNavButton('Overview', 'overview')}
          {renderNavButton('Materials', 'materials')}
          {renderNavButton('Schedule', 'schedule')}
          {renderNavButton('Performance', 'performance')}
          {renderNavButton('Profile', 'profile')}

          {/* 🔹 Logout button */}
          <Button color="error" variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Stud_navbar;
