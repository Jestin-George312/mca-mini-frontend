// previous_quizscores.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Chip // For styling the percentage
} from '@mui/material';

// Helper function to get a color for the score
const getChipColor = (percentage) => {
  if (percentage >= 75) return 'success';
  if (percentage >= 50) return 'warning';
  return 'error';
};

const PreviousQuizScores = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await fetch('http://127.0.0.1:8000/api/reports/quiz-history/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch quiz history');
        }
        const data = await res.json();
        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []); // Runs once on component mount

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        My Quiz History
      </Typography>
      
      {results.length === 0 ? (
        <Typography color="text.secondary">
          You have not completed any quizzes yet.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Topic</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Score</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row) => (
                <TableRow 
                  key={row.id} 
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#f9f9f9' } 
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ whiteSpace: 'nowrap' }}>
                    {row.date}
                  </TableCell>
                  <TableCell>{row.subject}</TableCell>
                  <TableCell>{row.topic}</TableCell>
                  <TableCell align="right">{`${row.score} / ${row.total_questions}`}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={`${row.percentage}%`} 
                      color={getChipColor(row.percentage)}
                      variant="outlined"
                      size="small"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default PreviousQuizScores;