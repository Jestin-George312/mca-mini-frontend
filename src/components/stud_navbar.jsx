import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';

const Stud_navbar = ({ activeView, setActiveView }) => {
  return (
    <AppBar position="sticky" color="default">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6">Student Dashboard</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant={activeView === 'home' ? 'contained' : 'outlined'}
            onClick={() => setActiveView('home')}
          >
            Home
          </Button>
          <Button
            variant={activeView === 'overview' ? 'contained' : 'outlined'}
            onClick={() => setActiveView('overview')}
          >
            Overview
          </Button>
          <Button onClick={() => setActiveView('materials')}>Materials</Button>
          <Button onClick={() => setActiveView('schedule')}>Schedule</Button>
          <Button onClick={() => setActiveView('performance')}>Performance</Button>
          <Button onClick={() => setActiveView('profile')}>Profile</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Stud_navbar;
