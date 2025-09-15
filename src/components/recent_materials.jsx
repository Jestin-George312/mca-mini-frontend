import React from 'react'
import { Container,Box, Typography, Button, Grid, Paper, Divider } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile';


const recent_materials = () => {
  return (
    <div>
          <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Recent Materials</Typography>
            <Box sx={{ marginTop: 1 }}>
              <Typography sx={{ color: 'text.secondary' }}>
                <span style={{ color: 'green' }}>•</span> Linear Algebra - Chapter 5 (Medium)
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                <span style={{ color: 'red' }}>•</span> Physics - Thermodynamics (Hard)
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                <span style={{ color: 'orange' }}>•</span> Data Structures - Trees (Easy)
              </Typography>
            </Box>
          </Paper>
        </Grid>
    </div>
  )
}

export default recent_materials
