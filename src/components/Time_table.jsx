import React, { useState, useEffect } from 'react';
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
    TableRow,
    CircularProgress // For loading
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StudySubject from './study_subject'; // This is your form component

/**
 * ✅ This component is updated to receive the *actual* plan data from your API.
 * The prop 'dayPlan' matches this structure:
 * {
 * "day": 1,
 * "tasks": [
 * { "duration": "2 hours", "subject": "AI", "topics": "...", "notes": "..." },
 * { "duration": "1 hour", "subject": "SQL", "topics": "...", "notes": "..." }
 * ]
 * }
 */
function StudyPlanCard({ dayPlan }) {
    // Destructure the props
    const { day, tasks } = dayPlan;

    return (
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        Day {day}
                    </Typography>
                    {/* The 'totalHours' is no longer needed as durations are per-task */}
                </Box>
                <TableContainer>
                    <Table sx={{ minWidth: 650, border: 'none' }} aria-label={`study plan for day ${day}`}>
                        <TableHead>
                            <TableRow>
                                {/* ✅ Updated table headers */}
                                <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Topics</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Notes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* ✅ Map over the 'tasks' array */}
                            {tasks.map((task, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    {/* ✅ Use the correct data fields */}
                                    <TableCell component="th" scope="row" sx={{ whiteSpace: 'nowrap' }}>
                                        {task.duration}
                                    </TableCell>
                                    <TableCell>{task.subject}</TableCell>
                                    <TableCell>{task.topics}</TableCell>
                                    <TableCell>{task.notes}</TableCell>
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
    
    // ✅ State for holding the fetched plan
    const [plan, setPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ Function to fetch the study plan from your API
    const fetchPlan = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('access');
            const res = await fetch('http://127.0.0.1:8000/api/timetable/my-plan/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.status === 404) {
                // No plan found, this is not an error
                setPlan(null);
            } else if (!res.ok) {
                // Other errors
                throw new Error('Failed to fetch study plan');
            } else {
                const data = await res.json();
                setPlan(data); // e.g., { study_plan: [...] }
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // ✅ Fetch the plan when the component first loads
    useEffect(() => {
        fetchPlan();
    }, []);

    // ✅ This function handles returning from the form
    // It also re-fetches the plan in case a new one was just created
    const handleBackFromForm = () => {
        setShowForm(false);
        fetchPlan(); // Re-fetch the plan
    };

    if (showForm) {
        return <StudySubject onBack={handleBackFromForm} />;
    }

    // ✅ Helper function to render the main content
    const renderContent = () => {
        if (isLoading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            );
        }

        if (error) {
            return (
                <Typography color="error" sx={{ mt: 2 }}>
                    Error: {error}
                </Typography>
            );
        }

        if (!plan || !plan.study_plan || plan.study_plan.length === 0) {
            return (
                <Typography sx={{ mt: 2, color: 'text.secondary' }}>
                    No study plan found. Click "Add a Study Plan" to create one!
                </Typography>
            );
        }

        // ✅ Map over the *actual* fetched data
        return plan.study_plan.map((dayPlan) => (
            <StudyPlanCard 
                key={dayPlan.day}
                dayPlan={dayPlan} // Pass the entire day object as a prop
            />
        ));
    };

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
                    New Study Plan ?
                </Button>
            </Box>
            
            {/* ✅ Render the main content (loading, error, or plan) */}
            {renderContent()}
        </Box>
    );
}