import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
  // ✅ --- ADD THESE IMPORTS --- ✅
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent
} from "@mui/material";

const QuizComponent = ({ topicId }) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // ✅ --- ADD NEW STATE TO HOLD THE UPDATED PLAN --- ✅
  const [newPlanData, setNewPlanData] = useState(null);


  // ... (useEffect to fetch questions is unchanged) ...
  useEffect(() => {
    if (!topicId) {
      console.error('Missing topicId');
      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access');
        
        const response = await fetch(
          `http://127.0.0.1:8000/api/quiz/get/${topicId}/`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        
        const data = await response.json();

        if (response.ok && data.questions) {
          const formattedQuestions = data.questions.map((q) => ({
            id: q.id, 
            question: q.question_text,
            options: [q.option_a, q.option_b, q.option_c, q.option_d].filter(Boolean),
            answer: q.correct_option
              ? q[`option_${q.correct_option.toLowerCase()}`]
              : null,
          }));
          setQuizQuestions(formattedQuestions);
          setSelectedAnswers(Array(formattedQuestions.length).fill(null));
        } else {
          console.error("Error loading questions:", data.error || data);
          alert("Failed to load quiz questions. Please try again.");
        }
      } catch (err) {
        console.error("Error fetching quiz questions:", err);
        alert("Error fetching quiz questions. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topicId]);

  // ... (handleAnswerChange, handleNext, handlePrevious are correct) ...
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

  // ✅ --- THIS HELPER FUNCTION IS UPDATED --- ✅
  // It now returns the new plan data on success, or null
  const updateStudyPlan = async (finalScore, totalQuestions) => {
    console.log('Checking if study plan needs update due to low score...');
    try {
      const token = localStorage.getItem('access');
      const body = JSON.stringify({
        topicId: topicId,
        score: finalScore,
        totalQuestions: totalQuestions,
      });

      const response = await fetch('http://127.0.0.1:8000/api/timetable/update-plan/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: body
      });

      const data = await response.json(); 

      if (!response.ok) {
        console.error('Failed to update study plan:', data.error);
        return null; // Return null on failure
      }
      
      if (data.study_plan) {
        console.log('Study plan updated successfully!');
        return data; // ✅ Return the new plan data
      } else {
        // This means the topic wasn't in the plan
        console.log(data.message); 
        return null; // Return null if no update occurred
      }
    } catch (error) {
      console.error('Error updating study plan:', error);
      return null; // Return null on exception
    }
  };


  // ✅ --- THIS FUNCTION IS UPDATED --- ✅
  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // 1. Calculate score
    let finalScore = 0;
    const totalQuestions = quizQuestions.length;
    for (let i = 0; i < totalQuestions; i++) {
      if (selectedAnswers[i] === quizQuestions[i].answer) {
        finalScore++;
      }
    }

    // 2. Prepare data to save the result
    const resultBody = JSON.stringify({
      topicId: topicId,
      score: finalScore,
      totalQuestions: totalQuestions,
    });

    try {
      // 3. Send result to backend
      const token = localStorage.getItem('access');
      const response = await fetch('http://127.0.0.1:8000/api/quiz/submit-response/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: resultBody
      });
      // (Error handling for saving the result)
      if (!response.ok) {
        console.error('Failed to save quiz response:');
      } else {
        console.log('Quiz response saved successfully!');
      }
    } catch (error) {
      console.error('Error submitting quiz response:', error);
    }
    
    // 4. ✅ --- CHECK SCORE AND *AWAIT* THE UPDATE --- ✅
    // If score is less than 75%, trigger the update
    if (totalQuestions > 0 && (finalScore / totalQuestions) < 0.75) {
      // We wait for the update to finish
      const updatedPlan = await updateStudyPlan(finalScore, totalQuestions);
      if (updatedPlan) {
        setNewPlanData(updatedPlan); // ✅ Save the new plan to state
      }
    }

    // 5. Show score to user *after* all logic is done
    setScore(finalScore);
    setIsSubmitting(false);
  };

  // ... (Your loading block is unchanged) ...
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading quiz questions...</Typography>
      </Box>
    );
  }


  // ✅ --- THIS RENDER BLOCK IS UPDATED --- ✅
  if (score !== null) {
    return (
      <Box sx={{ 
          display: "flex", 
          flexDirection: "column", // Arrange score and plan vertically
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "100vh", 
          backgroundColor: "#f7f9fc",
          py: 4, // Add vertical padding
          px: 2, // Add horizontal padding
      }}>
        {/* 1. The Score Box */}
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, width: "100%", maxWidth: 550, textAlign: "center", mb: 4 }}>
          <Typography variant="h4" gutterBottom>Quiz Completed!</Typography>
          <Typography variant="h5">Your final score: {score} / {quizQuestions.length}</Typography>
        </Paper>

        {/* 2. The Updated Plan Section (only shows if newPlanData exists) */}
        {newPlanData && (
          <Box sx={{ width: '100%', maxWidth: 900 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
              We've Updated Your Study Plan!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
              Here is your new plan, with more focus on the topics you found difficult.
            </Typography>
            
            {/* This is the rendering logic from your plan.jsx */}
            {newPlanData.study_plan.map((dayPlan) => (
              <Card key={dayPlan.day} sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Day {dayPlan.day}
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Topics</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Notes</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dayPlan.tasks.map((task, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ whiteSpace: 'nowrap' }}>{task.duration}</TableCell>
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
            ))}
          </Box>
        )}
      </Box>
    );
  }

  // ... (Your 'No questions found' block is unchanged) ...
  if (!quizQuestions.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', textAlign: "center", px: 2 }}>
        <Typography variant="h6">No questions found for this topic. Please try again later.</Typography>
      </Box>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // ... (Your main quiz question render block is unchanged) ...
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f7f9fc" }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, width: "100%", maxWidth: 550 }}>
        <Typography variant="h5" gutterBottom>Topic Quiz</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>Answer the following questions:</Typography>
        <hr />
        <Box sx={{ my: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Question {currentQuestionIndex + 1} of {quizQuestions.length}</Typography>
          <Typography variant="body1" sx={{ mb: 2, minHeight: '3em' }}>{currentQuestion.question}</Typography>
          <FormControl component="fieldset" fullWidth>
            <RadioGroup value={selectedAnswers[currentQuestionIndex] || ""} onChange={handleAnswerChange}>
              {currentQuestion.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    margin: "0 0 10px 0",
                    padding: "5px 10px",
                    backgroundColor: selectedAnswers[currentQuestionIndex] === option ? "#e0f7ff" : "transparent",
                    "&:hover": { backgroundColor: "#f0faff" },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          {currentQuestionIndex > 0 && (
            <Button variant="outlined" onClick={handlePrevious}>Previous</Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {currentQuestionIndex < quizQuestions.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>Next</Button>
          ) : (
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSubmit}
              disabled={isSubmitting} 
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default QuizComponent;