import React from 'react'
import { Container,Box, Typography, Button, Grid, Paper, Divider } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile';

const material_upload = () => {
  return (
    <div>
      <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Upload Study Materials</Typography>
            <Box
              sx={{
                border: '1px dashed grey',
                padding: 2,
                textAlign: 'center',
                marginTop: 1,
              }}
            >
              <UploadFileIcon sx={{ fontSize: 40 }} />
              <Typography>Drag & drop your PDFs or click to upload</Typography>
              <Button variant="contained" sx={{ marginTop: 1 }}>
                Choose Files
              </Button>
              <Typography variant="caption" sx={{ display: 'block', marginTop: 1 }}>
                Supports PDF, DOC, DOCX files up to 10MB
              </Typography>
            </Box>
          </Paper>
        </Grid>
    </div>
  )
}

export default material_upload
