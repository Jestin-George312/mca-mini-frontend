import React, { useState } from 'react';
import { 
    Button, 
    Card, 
    CardContent, 
    Typography, 
    Box, 
    TextField
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function StudySubject({ onBack }) {
    const [numSubjects, setNumSubjects] = useState(1);
    const [subjects, setSubjects] = useState([{ name: '' }]);

    const handleNumSubjectsChange = (e) => {
        const num = parseInt(e.target.value) || 0;
        setNumSubjects(num);
        
        // Adjust subjects array
        const newSubjects = [...subjects];
        if (num > subjects.length) {
            for (let i = subjects.length; i < num; i++) {
                newSubjects.push({ name: '' });
            }
        } else if (num < subjects.length) {
            newSubjects.splice(num);
        }
        setSubjects(newSubjects);
    };

    const handleSubjectNameChange = (index, value) => {
        const newSubjects = [...subjects];
        newSubjects[index].name = value;
        setSubjects(newSubjects);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', { numSubjects, subjects });
        // Add your submit logic here
        // You can call onBack() after successful submission if needed
    };

    return (
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Box sx={{ mb: 3 }}>
                <Button 
                    variant="outlined" 
                    startIcon={<ArrowBackIcon />}
                    onClick={onBack}
                    sx={{ 
                        borderRadius: 2, 
                        fontWeight: 'bold',
                        py: 1.5,
                        px: 3,
                    }}
                >
                    Back
                </Button>
            </Box>

            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
                        Create Study Plan
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            label="Number of Subjects"
                            type="number"
                            value={numSubjects}
                            onChange={handleNumSubjectsChange}
                            fullWidth
                            inputProps={{ min: 1, max: 20 }}
                            sx={{ mb: 3 }}
                        />

                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Subject Names
                        </Typography>

                        {subjects.map((subject, index) => (
                            <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                <TextField
                                    label={`Subject ${index + 1}`}
                                    value={subject.name}
                                    onChange={(e) => handleSubjectNameChange(index, e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Box>
                        ))}

                        <Button 
                            type="submit"
                            variant="contained" 
                            sx={{ 
                                borderRadius: 2, 
                                fontWeight: 'bold',
                                boxShadow: 'none',
                                py: 1.5,
                                px: 4,
                                mt: 3
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
