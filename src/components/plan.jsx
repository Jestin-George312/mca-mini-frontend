// plan.jsx

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
   * ✅ NEW planData example:
   * {
   * "study_plan": [
   * {
   * "day": 1,
   * "tasks": [
   * { "duration": "2 hours", "subject": "AI", "topics": "...", "notes": "..." },
   * { "duration": "1 hour", "subject": "SQL", "topics": "...", "notes": "..." }
   * ]
   * },
   * { "day": 2, "tasks": [...] }
   * ]
   * }
   */

  if (!planData || !planData.study_plan || planData.study_plan.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>No study plan found or plan is empty.</Typography>
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

      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
        Your Generated Study Plan
      </Typography>

      {planData.study_plan.map((dayPlan) => (
        <Card key={dayPlan.day} sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              Day {dayPlan.day}
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {/* ✅ Changed "Time" to "Duration" */}
                    <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Topics</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dayPlan.tasks.map((task, index) => (
                    <TableRow key={index}>
                      {/* ✅ Changed task.time_range to task.duration */}
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
  );
}