import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Container, Box, Typography, Button, Grid, Paper, TextField
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const uploadFile = async (file, subject) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('subject', subject);

  try {
    const response = await fetch('http://localhost:8000/api/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const result = await response.json();
    console.log('✅ File uploaded successfully:', result);
    return true;
  } catch (error) {
    console.error('❌ Upload failed:', error);
    return false;
  }
};

const MaterialUpload = () => {
  const dropzoneRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm();

  const subject = watch('subject');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropzoneRef.current) dropzoneRef.current.style.borderColor = 'grey';

    const file = event.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropzoneRef.current) dropzoneRef.current.style.borderColor = 'primary.main';
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropzoneRef.current) dropzoneRef.current.style.borderColor = 'grey';
  };

  const onSubmit = async (data) => {
    if (!selectedFile) {
      alert("Please select a file before uploading.");
      return;
    }

    const success = await uploadFile(selectedFile, data.subject);
    if (success) {
      reset();
      setSelectedFile(null);
      setShowForm(false); // 👈 Show button again
    }
  };

  return (
    <Container>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Upload Study Materials</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Subject"
                fullWidth
                margin="normal"
                {...register('subject', { required: true })}
              />

              <Box
                ref={dropzoneRef}
                sx={{
                  border: '1px dashed grey',
                  padding: 2,
                  textAlign: 'center',
                  marginTop: 1,
                  '&:hover': {
                    borderColor: 'primary.main',
                  },
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <UploadFileIcon sx={{ fontSize: 40 }} />
                <Typography>
                  {selectedFile ? `File Selected: ${selectedFile.name}` : 'Drag & drop your PDFs or click to upload'}
                </Typography>
                <Button component="label" variant="contained" sx={{ marginTop: 1 }}>
                  Choose Files
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                </Button>
                <Typography variant="caption" sx={{ display: 'block', marginTop: 1 }}>
                  Supports PDF, DOC, DOCX files up to 10MB
                </Typography>
              </Box>

              <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
                Upload
              </Button>
            </form>
          </Paper>
        </Grid>
      
    </Container>
  );
};

export default MaterialUpload;