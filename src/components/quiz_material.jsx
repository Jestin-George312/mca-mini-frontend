import React, { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
} from '@mui/material';
import QuizComponent from './quizcomponent'; // Make sure this path is correct

const Quiz_Material = () => {
  const [subject, setSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  
  // 1. Add state to track if the quiz has started
  const [quizStarted, setQuizStarted] = useState(false);

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const topicList = [
    { name: 'algebra', label: 'Algebra' },
    { name: 'geometry', label: 'Geometry' },
    { name: 'trigonometry', label: 'Trigonometry' },
    { name: 'calculus', label: 'Calculus' },
  ];

  // 2. Conditionally render the QuizComponent if the quiz has started
  if (quizStarted) {
    // You could pass subject and selectedTopic as props here if needed
    // e.g., <QuizComponent subject={subject} topic={selectedTopic} />
    return <QuizComponent />;
  }

  // Otherwise, render the setup form
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
          Select a subject and topics to start your quiz.
        </Typography>

        {/* Subject Dropdown */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="subject-select-label">Subject</InputLabel>
          <Select
            labelId="subject-select-label"
            id="subject-select"
            value={subject}
            label="Subject"
            onChange={handleSubjectChange}
          >
            <MenuItem value="">
              <em>Select a subject</em>
            </MenuItem>
            <MenuItem value={'math'}>Mathematics</MenuItem>
            <MenuItem value={'science'}>Science</MenuItem>
            <MenuItem value={'history'}>History</MenuItem>
          </Select>
        </FormControl>

        {/* Topics Dropdown */}
        <FormControl fullWidth>
          <InputLabel id="topic-select-label">Topics</InputLabel>
          <Select
            labelId="topic-select-label"
            id="topic-select"
            value={selectedTopic}
            label="Topics"
            onChange={handleTopicChange}
          >
            <MenuItem value="">
                <em>Select a topic</em>
            </MenuItem>
            {topicList.map((topic) => (
              <MenuItem key={topic.name} value={topic.name}>
                {topic.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Start Button */}
        <Button
          variant="contained"
          fullWidth
          // 3. Update the onClick handler to set the state
          onClick={() => setQuizStarted(true)} 
          sx={{
            mt: 4,
            py: 1.5,
            fontSize: '1rem',
            borderRadius: 2,
            backgroundColor: '#00aaff',
            '&:hover': {
              backgroundColor: '#0088cc',
            },
          }}
        >
          Start Quiz
        </Button>
      </Paper>
    </Box>
  );
};

export default Quiz_Material;