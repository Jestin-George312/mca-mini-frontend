import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Plan({ planData, onBack }) {
  /**
   * planData example (from Gemini API):
   * {
   *   study_plan: [
   *     { day: 1, focus_subject: 'AI', topics: 'Intro to ML', notes: 'Use Pomodoro' },
   *     { day: 2, focus_subject: 'Mathematics', topics: 'Calculus Chapter 1', notes: 'Review previous notes' },
   *     ...
   *   ]
   * }
   */

  if (!planData || !planData.study_plan) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>No study plan found.</Typography>
        <Button variant="outlined" onClick={onBack}>Back</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: 3 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onBack}>
          Back
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
            Your Generated Study Plan
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Focus Subject</TableCell>
                  <TableCell>Topics</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {planData.study_plan.map((dayPlan) => (
                  <TableRow key={dayPlan.day}>
                    <TableCell>{dayPlan.day}</TableCell>
                    <TableCell>{dayPlan.focus_subject}</TableCell>
                    <TableCell>{dayPlan.topics}</TableCell>
                    <TableCell>{dayPlan.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
