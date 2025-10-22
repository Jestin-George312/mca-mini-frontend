import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
  CircularProgress,
} from '@mui/material';
import QuizComponent from './quizcomponent';
import { useNavigate } from 'react-router-dom';

const Quiz_Material = () => {
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState('');
  const [availableTopics, setAvailableTopics] = useState([]); // This will now hold an array of OBJECTS
  
  // --- CHANGED ---
  // We now store the Topic ID (an integer), not the name (a string)
  const [selectedTopicId, setSelectedTopicId] = useState('');
  // --- END CHANGE ---

  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const navigate = useNavigate();

  // Fetch materials on mount (This part is correct)
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await fetch('http://127.0.0.1:8000/api/upload/list/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          console.error('Authorization failed. Token is invalid or expired.');
          localStorage.removeItem('access');
          navigate('/login', { replace: true });
          return;
        }

        if (!res.ok) throw new Error('Failed to fetch materials');
        const data = await res.json();
        setAvailableMaterials(data);
      } catch (error) {
        console.error(error);
        alert('Failed to load study materials. Please try again.');
      }
    };
    fetchMaterials();
  }, [navigate]);

  // Fetch topics when material is selected
  useEffect(() => {
    if (!selectedMaterialId) {
      setAvailableTopics([]);
      return;
    }

    const fetchTopics = async () => {
      setIsLoadingTopics(true);
      // --- CHANGED ---
      setSelectedTopicId(''); // Reset the ID
      // --- END CHANGE ---
      setAvailableTopics([]);

      try {
        const token = localStorage.getItem('access');
        const res = await fetch(
          `http://127.0.0.1:8000/topic-analysis/topics/${selectedMaterialId}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 401) {
          // (Error handling is correct)
          console.error('Authorization failed for topics.');
          localStorage.removeItem('access');
          navigate('/login', { replace: true });
          return;
        }

        if (!res.ok) throw new Error('Failed to fetch topics');
        const data = await res.json();

        console.log('API Response for Topics:', data);

        // --- CHANGED ---
        // We get the array of objects from data.topics
        const topicsList = data.topics;

        // We store the ENTIRE array of objects in state
        if (Array.isArray(topicsList)) {
          setAvailableTopics(topicsList);
        } else {
          setAvailableTopics([]);
        }
        // --- END CHANGE ---

      } catch (error) {
        console.error(error);
        alert('Failed to load topics for this material.');
      } finally {
        setIsLoadingTopics(false);
      }
    };

    fetchTopics();
  }, [selectedMaterialId, navigate]);

  const handleMaterialChange = (event) => setSelectedMaterialId(event.target.value);
  
  // --- CHANGED ---
  // This handler now saves the Topic ID
  const handleTopicChange = (event) => setSelectedTopicId(event.target.value);
  // --- END CHANGE ---

  if (quizStarted) {
    // --- CHANGED ---
    // We pass the topicId to the QuizComponent
    return <QuizComponent topicId={selectedTopicId} />;
    // --- END CHANGE ---
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f7f9fc',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: '100%',
          maxWidth: 450,
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Select a material and topic to start your quiz.
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="material-select-label">Material</InputLabel>
          <Select
            labelId="material-select-label"
            id="material-select"
            value={selectedMaterialId}
            label="Material"
            onChange={handleMaterialChange}
          >
            <MenuItem value="">
              <em>Select a material</em>
            </MenuItem>
            {availableMaterials.map((material) => (
              <MenuItem key={material.id} value={material.id}>
                {material.subject || material.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          disabled={!selectedMaterialId || isLoadingTopics}
          sx={{ position: 'relative' }}
        >
          <InputLabel id="topic-select-label">Topic</InputLabel>
          <Select
            labelId="topic-select-label"
            id="topic-select"
            // --- CHANGED ---
            value={selectedTopicId} // Value is now the ID
            label="Topic"
            onChange={handleTopicChange} // Uses the new handler
            // --- END CHANGE ---
          >
            <MenuItem value="">
              <em>{isLoadingTopics ? 'Loading...' : 'Select a topic'}</em>
            </MenuItem>
            {/* --- CHANGED --- */}
            {/* We map over the array of objects */}
            {/* The 'key' and 'value' are the topic.id */}
            {/* The text shown to the user is topic.topic_name */}
            {availableTopics.map((topic) => (
              <MenuItem key={topic.id} value={topic.id}>
                {topic.topic_name || topic.name || topic.topic}
              </MenuItem>
            ))}
            {/* --- END CHANGE --- */}
          </Select>
          {isLoadingTopics && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 16,
                marginTop: '-12px',
              }}
            />
          )}
        </FormControl>

        <Button
          variant="contained"
          fullWidth
          onClick={() => setQuizStarted(true)}
          // --- CHANGED ---
          disabled={!selectedMaterialId || !selectedTopicId || isLoadingTopics} // Now checks for topic ID
          // --- END CHANGE ---
          sx={{
            mt: 4,
            py: 1.5,
            fontSize: '1rem',
            borderRadius: 2,
            backgroundColor: '#00aaff',
            '&:hover': { backgroundColor: '#0088cc' },
          }}
        >
          Start Quiz
        </Button>
      </Paper>
    </Box>
  );
};

export default Quiz_Material;