import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
    Button, 
    Card, 
    CardContent, 
    Typography, 
    Box, 
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Plan from './Plan';

let dummyMaterials = []; // temporary storage for fetched materials

export default function StudySubject({ onBack }) {
    const [availableMaterials, setAvailableMaterials] = useState([]);
    const [showPlan, setShowPlan] = useState(false);
    const [planData, setPlanData] = useState(null);

    const { handleSubmit, control, watch, setValue } = useForm({
        defaultValues: {
            numSubjects: 1,
            totalDays: 7,
            hoursPerDay: 2,
            selectedMaterials: [null],
        }
    });

    const numSubjects = watch('numSubjects');
    const selectedMaterials = watch('selectedMaterials');

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const token = localStorage.getItem('access'); // JWT
                const res = await fetch('http://127.0.0.1:8000/api/upload/list/', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (!res.ok) throw new Error('Failed to fetch materials');
                const data = await res.json();
                dummyMaterials = data;
                setAvailableMaterials(dummyMaterials);
            } catch (error) {
                console.error(error);
                alert('Failed to load study materials.');
            }
        };
        fetchMaterials();
    }, []);

    const onNumSubjectsChange = (value) => {
        setValue('numSubjects', value);
        const newSelection = [...selectedMaterials];
        if (value > selectedMaterials.length) {
            for (let i = selectedMaterials.length; i < value; i++) newSelection.push(null);
        } else if (value < selectedMaterials.length) {
            newSelection.splice(value);
        }
        setValue('selectedMaterials', newSelection);
    };

    const onMaterialChange = (index, value) => {
        const newSelection = [...selectedMaterials];
        newSelection[index] = value;
        setValue('selectedMaterials', newSelection);
    };

    const onFormSubmit = (data) => {
        const material_ids = data.selectedMaterials.filter(id => id !== null);

        if (material_ids.length !== data.numSubjects) {
            alert('Please select a material for each subject.');
            return;
        }

        // Get the selected materials
        const selectedMats = material_ids.map(id => availableMaterials.find(m => m.id === id));

        // Build the study plan
        const totalDays = data.totalDays;
        const hoursPerDay = data.hoursPerDay;

        const study_plan = [];
        for (let day = 1; day <= totalDays; day++) {
            const subjectIndex = (day - 1) % selectedMats.length;
            const mat = selectedMats[subjectIndex];

            study_plan.push({
                day: day,
                focus_subject: mat.subject,
                topics: mat.title,
                notes: `Study for ${hoursPerDay} hour(s). Take short breaks and review previous topics!`
            });
        }

        setPlanData({
            totalDays,
            hoursPerDay,
            study_plan
        });

        setShowPlan(true);
    };

    return (
        <>
            {!showPlan ? (
                <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                    <Box sx={{ mb: 3 }}>
                        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onBack}>
                            Back
                        </Button>
                    </Box>

                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                                Create Study Plan
                            </Typography>

                            <Box component="form" onSubmit={handleSubmit(onFormSubmit)}>
                                {/* Number of Subjects */}
                                <Controller
                                    name="numSubjects"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Number of Subjects"
                                            type="number"
                                            fullWidth
                                            inputProps={{ min: 1, max: availableMaterials.length || 1 }}
                                            sx={{ mb: 3 }}
                                            onChange={(e) => onNumSubjectsChange(parseInt(e.target.value) || 1)}
                                        />
                                    )}
                                />

                                {/* Total Days & Hours per Day */}
                                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                    <Controller
                                        name="totalDays"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Total Study Days"
                                                type="number"
                                                fullWidth
                                                inputProps={{ min: 1 }}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="hoursPerDay"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Hours Per Day"
                                                type="number"
                                                fullWidth
                                                inputProps={{ min: 1, max: 24 }}
                                            />
                                        )}
                                    />
                                </Box>

                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    Select Your Materials
                                </Typography>

                                {Array.from({ length: numSubjects }).map((_, index) => (
                                    <Controller
                                        key={index}
                                        name={`selectedMaterials.${index}`}
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl fullWidth required sx={{ mb: 2 }}>
                                                <InputLabel>Subject {index + 1}</InputLabel>
                                                <Select
                                                    {...field}
                                                    value={field.value || ''}
                                                    label={`Subject ${index + 1}`}
                                                    onChange={(e) => onMaterialChange(index, e.target.value)}
                                                >
                                                    <MenuItem value="" disabled>
                                                        <em>Select a material</em>
                                                    </MenuItem>
                                                    {availableMaterials.map((material) => (
                                                        <MenuItem
                                                            key={material.id}
                                                            value={material.id}
                                                            disabled={selectedMaterials.includes(material.id) && selectedMaterials[index] !== material.id}
                                                        >
                                                            {material.title} ({material.subject})
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}
                                    />
                                ))}

                                <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                                    Generate Plan
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            ) : (
                <Plan planData={planData} onBack={() => setShowPlan(false)} />
            )}
        </>
    );
}
