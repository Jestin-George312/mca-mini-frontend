import React from 'react'
import { Container,Box, Typography, Button, Grid, Paper, Divider } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile';
const todays_schedule = () => {
  return (
    <div>
        <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Today's Schedule</Typography>
        <Paper sx={{ padding: 2, marginTop: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
            <Typography><span style={{ color: 'red' }}>•</span> Complete Physics Quiz</Typography>
            <Typography>2:00 PM</Typography>
            <Button variant="outlined" size="small">Start</Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
            <Typography><span style={{ color: 'orange' }}>•</span> Review Math Notes</Typography>
            <Typography>4:30 PM</Typography>
            <Button variant="outlined" size="small">Start</Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography><span style={{ color: 'green' }}>•</span> Prepare for Chemistry Lab</Typography>
            <Typography>Tomorrow</Typography>
            <Button variant="outlined" size="small">Start</Button>
          </Box>
        </Paper>
      </Box>
    </div>
  )
}

export default todays_schedule
