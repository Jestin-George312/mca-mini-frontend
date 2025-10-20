import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';

// Sample quiz questions array
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: "Pacific"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "F. Scott Fitzgerald", "Ernest Hemingway"],
        answer: "Harper Lee"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Pb", "Fe"],
        answer: "Au"
    },
    {
        question: "In which year did the Titanic sink?",
        options: ["1905", "1912", "1918", "1923"],
        answer: "1912"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        answer: "Diamond"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "Which is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        answer: "Nile"
    },
    {
        question: "What is the main ingredient in guacamole?",
        options: ["Tomato", "Avocado", "Onion", "Lime"],
        answer: "Avocado"
    }
];


const QuizComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quizQuestions.length).fill(null));
  const [score, setScore] = useState(null);
  
  const handleAnswerChange = (event) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let finalScore = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
        if(selectedAnswers[i] === quizQuestions[i].answer) {
            finalScore++;
        }
    }
    setScore(finalScore);
  };
  
  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (score !== null) {
      return (
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, width: '100%', maxWidth: 550, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>Quiz Completed!</Typography>
                <Typography variant="h5">Your final score is: {score} out of {quizQuestions.length}</Typography>
            </Paper>
        </Box>
      );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, width: '100%', maxWidth: 550 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Quiz: General Knowledge
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Answer the following questions. Choose the best answer for each question.
        </Typography>
        <hr/>
        <Box sx={{ my: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </Typography>
            <Typography variant="body1" sx={{mb: 2}}>
                {currentQuestion.question}
            </Typography>
            <FormControl component="fieldset" fullWidth>
                <RadioGroup
                    aria-label="quiz-options"
                    name="quiz-options"
                    value={selectedAnswers[currentQuestionIndex] || ''}
                    onChange={handleAnswerChange}
                >
                    {currentQuestion.options.map((option, index) => (
                         <FormControlLabel
                            key={index}
                            value={option}
                            control={<Radio />}
                            label={option}
                            sx={{
                                border: '1px solid #ddd',
                                borderRadius: 2,
                                margin: '0 0 10px 0',
                                padding: '5px 10px',
                                backgroundColor: selectedAnswers[currentQuestionIndex] === option ? '#e0f7ff' : 'transparent',
                                '&:hover': {
                                    backgroundColor: '#f0faff'
                                }
                            }}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            {currentQuestionIndex > 0 && (
                <Button variant="outlined" onClick={handlePrevious}>
                    Previous
                </Button>
            )}

            <Box sx={{ flexGrow: 1}} />
            
            {currentQuestionIndex < quizQuestions.length - 1 ? (
                 <Button variant="contained" onClick={handleNext}>
                    Next
                </Button>
            ) : (
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            )}
        </Box>
      </Paper>
    </Box>
  );
};

export default QuizComponent;