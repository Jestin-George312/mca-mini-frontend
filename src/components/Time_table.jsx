import React, { useState } from 'react';
import { 
    Button, 
    Card, 
    CardContent, 
    Typography, 
    Box, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StudySubject from './study_subject';

// Sample data to populate the study plan
const studyData = [
    {
        day: 1,
        totalHours: 4,
        subjects: [
            { name: 'Science', topic: 'Thermodynamics', time: '1hr' },
            { name: 'Maths', topic: 'Trigonometry', time: '3hr' },
        ],
    },
    {
        day: 2,
        totalHours: 5,
        subjects: [
            { name: 'English', topic: 'Literature', time: '2hr' },
            { name: 'Physics', topic: 'Mechanics', time: '3hr' },
        ],
    },
    {
        day: 3,
        totalHours: 4,
        subjects: [
            { name: 'Chemistry', topic: 'Organic Chemistry', time: '2hr' },
            { name: 'History', topic: 'Ancient Civilizations', time: '2hr' },
        ],
    },
];

function StudyPlanCard({ day, totalHours, subjects }) {
    return (
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        Day {day}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Total hr: {totalHours}hr
                    </Typography>
                </Box>
                <TableContainer>
                    <Table sx={{ minWidth: 650, border: 'none' }} aria-label={`study plan for day ${day}`}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '33%' }}>Subject</TableCell>
                                <TableCell sx={{ width: '33%' }}>Topic</TableCell>
                                <TableCell align="right" sx={{ width: '33%' }}>Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subjects.map((subject) => (
                                <TableRow key={`${day}-${subject.name}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {subject.name}
                                    </TableCell>
                                    <TableCell>{subject.topic}</TableCell>
                                    <TableCell align="right">{subject.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}

export default function TimetablePage() {
    const [showForm, setShowForm] = useState(false);

    if (showForm) {
        return <StudySubject onBack={() => setShowForm(false)} />;
    }

    return (
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Box sx={{ mb: 3 }}>
                <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={() => setShowForm(true)}
                    sx={{ 
                        borderRadius: 2, 
                        fontWeight: 'bold',
                        boxShadow: 'none',
                        py: 1.5,
                        px: 3,
                    }}
                >
                    Add a Study Plan
                </Button>
            </Box>
            
            {studyData.map((plan) => (
                <StudyPlanCard 
                    key={plan.day}
                    day={plan.day}
                    totalHours={plan.totalHours}
                    subjects={plan.subjects}
                />
            ))}
        </Box>
    );
}
