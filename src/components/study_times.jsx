import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography
} from '@mui/material';

// Dummy data for the study times
const studyTimesData = [
    { id: 'study_time1', time: '120:00' },
    { id: 'study_time2', time: '45:30' },
    { id: 'study_time3', time: '60:15' },
    { id: 'study_time4', time: '90:00' },
    { id: 'study_time5', time: '30:45' },
    { id: 'study_time6', time: '75:20' },
];

export default function StudyTimes() {
    return (
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
            <Typography 
                variant="h4" 
                component="h1" 
                sx={{ fontWeight: 'bold', mb: 4, color: '#333' }}
            >
                Study Times
            </Typography>

            <Grid container spacing={3}>
                {studyTimesData.map((item) => (
                    // By adding `display: 'flex'`, we make the grid column a flex container.
                    // This allows the Card inside to correctly expand to the full 100% width.
                    <Grid item xs={12} sm={6} md={4} key={item.id} sx={{ display: 'flex' }}>
                        <Card 
                            sx={{ 
                                borderRadius: 4, 
                                boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                                height: '250px', 
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                width: '100%' // This will now work as expected.
                            }}
                        >
                            <CardContent>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ fontWeight: 'bold', color: 'text.secondary', mb: 1 }}
                                >
                                    {item.id}
                                </Typography>
                                <Typography 
                                    variant="h3" 
                                    component="div" 
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    {item.time}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

