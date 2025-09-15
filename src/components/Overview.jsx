import React from 'react'
import { Container,Box, Typography, Button, Grid, Paper, Divider } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Material_upload from './material_upload';
import Recent_materials from './recent_materials';
import Todays_schedule from './todays_schedule';

const Overview = () => {
  return (
  <Container id='overview'>
   <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {/* Upload Study Materials */}
        <Material_upload/>

        {/* Recent_Materials */}
        <Recent_materials/>
      </Grid>

      {/* Today's Schedule */}
      <Todays_schedule/>
    </Box>

    
  </Container>
  )
}

export default Overview
