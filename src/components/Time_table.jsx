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
    CircularProgress,
    IconButton,
    FormControlLabel, // ✅ Added for the switch
    Switch // ✅ Added for the switch
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StudySubject from './study_subject'; // This is your form component

/**
 * ✅ This component is updated to receive completion status props
 */
function StudyPlanCard({ 
    dayPlan, 
    onNextDay, 
    onPreviousDay, 
    isFirstDay, 
    isLastDay,
    isCompleted,      // ✅ NEW: The completion status for this day
    onToggleComplete  // ✅ NEW: The function to call when switched
}) {
    // Destructure the props
    const { day, tasks } = dayPlan;

    return (
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
                
                {/* Day Navigation Header */}
                <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                    <IconButton onClick={onPreviousDay} disabled={isFirstDay} aria-label="previous day">
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ fontWeight: 'bold', mx: { xs: 1, sm: 3 }, minWidth: '80px', textAlign: 'center' }}
                    >
                        Day {day}
                    </Typography>
                    <IconButton onClick={onNextDay} disabled={isLastDay} aria-label="next day">
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>

                <TableContainer>
                    <Table sx={{ minWidth: 650, border: 'none' }} aria-label={`study plan for day ${day}`}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Topics</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Notes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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

                {/* ✅ START: Completion Switch */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        alignItems: 'center', 
                        mt: 2, 
                        pr: 1 
                    }}
                >
                    <FormControlLabel
                        control={
                            <Switch 
                                checked={isCompleted} 
                                onChange={onToggleComplete} 
                                color="primary"
                            />
                        }
                        label={isCompleted ? "Day Completed!" : "Mark as Complete"}
                    />
                </Box>
                {/* ✅ END: Completion Switch */}

            </CardContent>
        </Card>
    );
}

export default function TimetablePage() {
    const [showForm, setShowForm] = useState(false);
    
    // State for holding the fetched plan
    const [plan, setPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // State to track the *current* day's index
    const [currentDayIndex, setCurrentDayIndex] = useState(0);

    // ✅ NEW: State to track completion status, e.g., { 1: false, 2: true }
    const [completionStatus, setCompletionStatus] = useState({});

    // Function to fetch the study plan from your API
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
                setPlan(null);
                setCurrentDayIndex(0);
                setCompletionStatus({}); // ✅ Reset completion
            } else if (!res.ok) {
                throw new Error('Failed to fetch study plan');
            } else {
                const data = await res.json();
                setPlan(data); // e.g., { study_plan: [...] }

                // ✅ NEW: Initialize completion state from fetched data
                const initialStatus = {};
                if (data && data.study_plan) {
                    data.study_plan.forEach(dayPlan => {
                        // Assumes your API *might* send 'is_completed'
                        // If not, it defaults to false
                        initialStatus[dayPlan.day] = dayPlan.is_completed || false; 
                    });
                }
                setCompletionStatus(initialStatus);

                setCurrentDayIndex(0); // Reset to first day
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch the plan when the component first loads
    useEffect(() => {
        fetchPlan();
    }, []);

    // This function handles returning from the form
    const handleBackFromForm = () => {
        setShowForm(false);
        fetchPlan(); // Re-fetch the plan
    };

    // --- Navigation Handlers ---
    const handleNextDay = () => {
        if (plan && currentDayIndex < plan.study_plan.length - 1) {
            setCurrentDayIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePreviousDay = () => {
        if (currentDayIndex > 0) {
            setCurrentDayIndex(prevIndex => prevIndex - 1);
        }
    };
    
    // ✅ NEW: Handler to toggle completion status
    const handleToggleComplete = (dayNumber) => {
        const currentStatus = completionStatus[dayNumber];

        // Optimistically update the UI
        setCompletionStatus(prevStatus => ({
            ...prevStatus,
            [dayNumber]: !currentStatus 
        }));

        // --- TODO: Persist this change to your backend ---
        // You should now make an API call to update this in your database
        //
        // Example:
        // const token = localStorage.getItem('access');
        // fetch(`http://127.0.0.1:8000/api/timetable/update-day/${dayNumber}/`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     },
        //     body: JSON.stringify({ is_completed: !currentStatus })
        // })
        // .then(res => {
        //     if (!res.ok) {
        //         // If API fails, revert the state
        //         setCompletionStatus(prevStatus => ({
        //             ...prevStatus,
        //             [dayNumber]: currentStatus 
        //         }));
        //     }
        // })
        // .catch(err => {
        //     console.error("Failed to update status:", err);
        //     // Revert state on error
        //     setCompletionStatus(prevStatus => ({
        //         ...prevStatus,
        //         [dayNumber]: currentStatus 
        //     }));
        // });
    };

    if (showForm) {
        return <StudySubject onBack={handleBackFromForm} />;
    }

    // Helper function to render the main content
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
                    No study plan found. Click "New Study Plan ?" to create one!
                </Typography>
            );
        }

        // --- Logic to show only the current day ---
        
        // Get the data for the *current* day
        const currentDayData = plan.study_plan[currentDayIndex];
        const currentDayNumber = currentDayData.day;
        
        // Get the completion status for the *current* day
        const isCompleted = completionStatus[currentDayNumber] || false;
        
        // Determine if arrows should be disabled
        const isFirstDay = currentDayIndex === 0;
        const isLastDay = currentDayIndex === plan.study_plan.length - 1;

        // Render *only* the current day's card
        return (
            <StudyPlanCard 
                key={currentDayData.day}
                dayPlan={currentDayData}
                // Navigation props
                onNextDay={handleNextDay}
                onPreviousDay={handlePreviousDay}
                isFirstDay={isFirstDay}
                isLastDay={isLastDay}
                // Completion props
                isCompleted={isCompleted}
                onToggleComplete={() => handleToggleComplete(currentDayNumber)}
            />
        );
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
            
            {renderContent()}
        </Box>
    );
}