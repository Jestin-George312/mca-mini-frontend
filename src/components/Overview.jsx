import React from 'react';
import { Box, Typography, Paper, Card, Stack } from '@mui/material';

const Dot = ({ color }) => (
  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color }} />
);

const Overview = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Use a Stack for a clean vertical arrangement.
  // This replaces the need for a Grid for this simple layout.
  return (
    <Stack id='overview'>
      {/* --- Study Time Overview Section --- */}
      <Box sx={{
        p: { xs: 4, md: 6 },
        background: 'linear-gradient(180deg, #cfe8ff 0%, #e9f2ff 100%)',
        textAlign: 'center'
      }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
          Study Time Overview
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ opacity: 0.9 }}>
          Track your progress and stay motivated.
        </Typography>
      </Box>

      {/* --- Study Time Comparison Section --- */}
      {/* This Card will also take the full width. 'square' removes the border-radius. */}
      <Card elevation={3} square>
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Study Time Comparison
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
            Expected vs. Actual study time for the last 7 days.
          </Typography>

          {/* Legend - using a Stack for horizontal alignment */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" mb={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Dot color="#1976d2" />
              <Typography variant="body2">Expected</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Dot color="#64b5f6" />
              <Typography variant="body2">Actual</Typography>
            </Stack>
          </Stack>

          {/* Chart placeholder */}
          <Paper variant="outlined" sx={{
            height: 360,
            borderRadius: 2,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0))',
            mb: 2
          }} />

          {/* X axis labels */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', px: 2 }}>
            {days.map((d) => (
              <Typography key={d} align="center" variant="caption" color="text.secondary">
                {d}
              </Typography>
            ))}
          </Box>
        </Box>
      </Card>
    </Stack>
  );
}

export default Overview;