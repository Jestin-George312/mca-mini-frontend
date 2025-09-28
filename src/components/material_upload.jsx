import React, { useState, useRef } from 'react';
import { Container, Box, Typography, Button, Grid, Paper, Divider } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { styled } from '@mui/material/styles';

// Use styled to create a hidden input
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

// ... sending the file to backend ...

const uploadFile = async (file) => {
  if (!file) {
    console.error("No file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append('file', file); // 'file' should match the field name in your Django backend

  try {
    const response = await fetch('http://localhost:8000/api/upload', { // Replace with your Django API endpoint
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`, 
        // ✅ Include JWT access token
      },
      body: formData,
      // No 'Content-Type' header is needed; the browser sets it for FormData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('File uploaded successfully:', result);
    // You can add state updates here to show success message to the user
  } catch (error) {
    console.error('Error uploading file:', error);
    // Handle the error (e.g., show an error message to the user)
  }
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    setSelectedFile(file);
    console.log('Selected file:', file);
    uploadFile(file); // Call the upload function immediately after selection
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  event.stopPropagation();
  // Reset border color after drop
  if (dropzoneRef.current) {
    dropzoneRef.current.style.borderColor = 'grey';
  }

  const file = event.dataTransfer.files[0];
  if (file) {
    setSelectedFile(file);
    console.log('Dropped file:', file);
    uploadFile(file); // Call the upload function after the file is dropped
  }
};

// ... sending the file to backend  ...

const MaterialUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dropzoneRef = useRef(null);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // You can add logic here to upload the file to a server
      console.log('Selected file:', file);
      uploadFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // Add visual feedback for drag-and-drop
    if (dropzoneRef.current) {
        dropzoneRef.current.style.borderColor = 'primary.main';
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // Remove visual feedback
    if (dropzoneRef.current) {
        dropzoneRef.current.style.borderColor = 'grey';
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // Reset border color after drop
    if (dropzoneRef.current) {
        dropzoneRef.current.style.borderColor = 'grey';
    }

    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      console.log('Dropped file:', file);
    }
  };

  return (
    <div>
      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Upload Study Materials</Typography>
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
            <Button
              component="label"
              variant="contained"
              sx={{ marginTop: 1 }}
            >
              Choose Files
              <VisuallyHiddenInput 
                type="file"
                onChange={handleFileChange}
                // Add "multiple" prop to allow multiple files
                // multiple
                // You can also add "accept" prop for file type validation
                // accept=".pdf, .doc, .docx"
              />
            </Button>
            <Typography variant="caption" sx={{ display: 'block', marginTop: 1 }}>
              Supports PDF, DOC, DOCX files up to 10MB
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </div>
  );
};

export default MaterialUpload;
