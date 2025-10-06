import React from 'react';
import {
  Box,
  Button,
  Card,
  CssBaseline,
  IconButton,
  ListItemIcon,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SyncIcon from '@mui/icons-material/Sync';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';

// Corrected import path
import getTheme from '../theme.js';


// --- MOCK DATA ---
const scheduleData = {
    'Monday, October 21': [
        { title: 'Maths - Chapter 3', time: '8:00 AM - 9:00 AM', icon: <MenuBookIcon />, status: 'Done' },
        { title: 'Physics - Chapter 2', time: '9:00 AM - 10:00 AM', icon: <MenuBookIcon />, status: 'Overdue' },
        { title: 'Break', time: '10:00 AM - 11:00 AM', icon: <LocalCafeIcon />, status: 'Done' },
    ],
    'Tuesday, October 22': [
        { title: 'Maths - Chapter 4', time: '8:00 AM - 9:00 AM', icon: <MenuBookIcon />, status: 'Upcoming' },
    ]
};

// --- MAIN COMPONENT ---
export default function TimetablePage() {
  const [value, setValue] = React.useState(0);
  const handleTabChange = (event, newValue) => { setValue(newValue); };

  const renderCalendar = () => { /* ... function content remains the same ... */ 
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const dates = Array.from({ length: 31 }, (_, i) => i + 1);
    
    return (
      <Box sx={{ p: 2, backgroundColor: 'background.paper', borderRadius: 3, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <IconButton size="small"><ChevronLeftIcon /></IconButton>
          <Typography variant="h6">October 2024</Typography>
          <IconButton size="small"><ChevronRightIcon /></IconButton>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, textAlign: 'center' }}>
          {days.map(day => <Typography key={day} variant="body2" color="text.secondary">{day}</Typography>)}
          {dates.map(date => {
            const isSelected = date === 7;
            const isInRange = date >= 6 && date <= 12;
            return (
              <IconButton
                key={date}
                size="small"
                sx={{
                  backgroundColor: isSelected ? 'primary.main' : isInRange ? 'rgba(62, 166, 255, 0.2)' : 'transparent',
                  color: isSelected ? 'white' : 'text.primary',
                  '&:hover': {
                    backgroundColor: isSelected ? 'primary.dark' : 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                {date}
              </IconButton>
            )
          })}
        </Box>
        <Button startIcon={<SyncIcon />} fullWidth sx={{ mt: 3 }}>Sync with Calendar</Button>
      </Box>
    );
  };
  
  const renderSchedule = () => { /* ... function content remains the same ... */ 
    return (
      <Box>
          {Object.entries(scheduleData).map(([date, items]) => (
              <Box key={date} sx={{mb: 3}}>
                  <Typography variant="h6" sx={{mb: 2}}>{date}</Typography>
                  {items.map((item, index) => {
                    const isOverdue = item.status === 'Overdue';
                    return (
                      <Card key={index} elevation={3} sx={{ 
                        p: 2, 
                        mb: 1.5, 
                        display: 'flex', 
                        alignItems: 'center',
                        position: 'relative',
                        backgroundColor: isOverdue ? '#282828' : 'background.paper',
                        opacity: isOverdue ? 0.7 : 1,
                      }}>
                        <ListItemIcon sx={{color: isOverdue ? 'text.secondary' : 'primary.main', minWidth: 40}}>
                          {item.icon}
                        </ListItemIcon>
                        <Box>
                          <Typography variant="body1" sx={{fontWeight: '500', textDecoration: isOverdue ? 'line-through' : 'none'}}>{item.title}</Typography>
                          <Typography variant="body2" color="text.secondary">{item.time}</Typography>
                        </Box>
                        {isOverdue && (
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: '#ff8a80',
                              position: 'absolute', 
                              top: 16, 
                              right: 16,
                              fontWeight: 'bold'
                            }}>
                            Overdue
                          </Typography>
                        )}
                      </Card>
                    )
                  })}
              </Box>
          ))}
      </Box>
    );
  };

  return (
    <ThemeProvider theme={getTheme('light')}>
        <CssBaseline />
        <Box component="main" sx={{ p: 4, backgroundColor: 'background.default', height: '100vh', overflow: 'auto' }}>
            {/* --- HEADER --- */}
            <Box>
                <Typography variant="h4">Timetable</Typography>
                <Typography color="text.secondary" sx={{mb: 2}}>
                    AI-generated timetable based on your syllabus and study hours
                </Typography>
                <Tabs value={value} onChange={handleTabChange}>
                    <Tab label="Weekly" />
                    <Tab label="Monthly" />
                </Tabs>
            </Box>

            {/* --- MAIN CONTENT GRID --- */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '350px 1fr' }, gap: 4, mt: 3 }}>
                {/* Left Column: Calendar */}
                {renderCalendar()}
                {/* Right Column: Schedule */}
                {renderSchedule()}
            </Box>
        </Box>
    </ThemeProvider>
  );
}