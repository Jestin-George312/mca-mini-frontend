import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CssBaseline,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
  TextField,
  Paper,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import getTheme from '../theme.js';

// Hidden input for custom file upload button
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

// ---------------------------
// Upload File API
// ---------------------------
const uploadFile = async (file, subject) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('subject', subject);

  try {
    const response = await fetch('http://localhost:8000/api/upload/', {
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

// ---------------------------
// MAIN COMPONENT
// ---------------------------
export default function StudySmartDashboard() {
  const [currentView, setCurrentView] = useState('materials'); // 'materials' or 'upload'
  const [materials, setMaterials] = useState([]); // ✅ Dynamic materials from backend
  const [loading, setLoading] = useState(true);
  const dropzoneRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { register, handleSubmit, reset, watch } = useForm();
  const subject = watch('subject');

  // ---------------------------
  // Fetch Materials from Backend
  // ---------------------------
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await fetch('http://127.0.0.1:8000/api/upload/list/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch materials');

        const data = await res.json();
        console.log('📄 Materials fetched:', data);

        // Transform backend response if necessary
        const formatted = data.map((item) => ({
          id: item.id,
          title: item.title || item.name || 'Untitled Material',
          subject: item.subject || 'Unknown Subject',
          difficulty: item.difficulty || 'Medium',
          progress: item.progress || 0,
        }));

        setMaterials(formatted);
      } catch (error) {
        console.error(error);
        alert('Failed to load materials.');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [currentView]); // refetch when switching back after upload

  // ---------------------------
  // View Handlers
  // ---------------------------
  useEffect(() => {
    const handlePopState = (event) => {
      if (currentView === 'upload') {
        setCurrentView('materials');
        event.preventDefault();
        window.history.pushState({ view: 'materials' }, '', window.location.pathname);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView]);

  const handleViewChange = (newView) => {
    setCurrentView(newView);
    if (newView === 'upload') {
      window.history.pushState({ view: 'upload' }, '', window.location.pathname);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'hard': return 'error';
      case 'medium': return 'warning';
      case 'easy': return 'success';
      default: return 'default';
    }
  };

  // ---------------------------
  // File Upload Handlers
  // ---------------------------
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

  // ---------------------------
  // Form Submit (Upload)
  // ---------------------------
  const onSubmit = async (data) => {
    if (!selectedFile) {
      alert("Please select a file before uploading.");
      return;
    }

    const success = await uploadFile(selectedFile, data.subject);
    if (success) {
      reset();
      setSelectedFile(null);
      setCurrentView('materials'); // Go back to materials list
    }
  };

  // ---------------------------
  // MATERIALS VIEW
  // ---------------------------
  const renderMaterialsView = () => (
    <>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Materials</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewChange('upload')}
          startIcon={<AddIcon />}
        >
          Upload New
        </Button>
      </Box>

      {/* AI Feature Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3, mb: 5 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>AI Topic Extraction</Typography>
            <Typography variant="body2" color="text.secondary">Automatically extract key topics from your PDFs and DOCs.</Typography>
            <Button size="small" sx={{ mt: 2 }}>Try it now</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>AI Difficulty Tagging</Typography>
            <Typography variant="body2" color="text.secondary">Let our AI analyze and tag difficulty levels.</Typography>
            <Button size="small" sx={{ mt: 2 }}>Learn more</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>AI Note Summarization</Typography>
            <Typography variant="body2" color="text.secondary">Get concise summaries of your study notes instantly.</Typography>
            <Button size="small" sx={{ mt: 2 }}>Summarize notes</Button>
          </CardContent>
        </Card>
      </Box>

      {/* All Materials Table */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">All Materials</Typography>
        <Box>
          <Button variant="outlined" size="small" sx={{ mr: 1 }}>Difficulty</Button>
          <Button variant="outlined" size="small" sx={{ mr: 1 }}>Subject</Button>
          <Button variant="outlined" size="small">Progress</Button>
        </Box>
      </Box>

      {loading ? (
        <Typography>Loading materials...</Typography>
      ) : materials.length === 0 ? (
        <Typography color="text.secondary">No materials found.</Typography>
      ) : (
        <TableContainer component={Card}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>TITLE</TableCell>
                <TableCell>SUBJECT</TableCell>
                <TableCell>DIFFICULTY</TableCell>
                <TableCell>PROGRESS</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materials.map((row) => (
                <TableRow key={row.id || row.title} hover>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.subject}</TableCell>
                  <TableCell>
                    <Chip label={row.difficulty} color={getDifficultyColor(row.difficulty)} size="small" />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LinearProgress variant="determinate" value={row.progress} sx={{ width: '80%', mr: 1, height: 8, borderRadius: 5 }} />
                      <Typography variant="body2" color="text.secondary">{`${row.progress}%`}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button variant="text" size="small">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );

  // ---------------------------
  // UPLOAD VIEW
  // ---------------------------
  const renderUploadView = () => (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button variant="outlined" onClick={() => setCurrentView('materials')} sx={{ mr: 2 }}>
          ← Back to Materials
        </Button>
        <Typography variant="h4">Upload New Material</Typography>
      </Box>

      <Grid container spacing={2}>
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
                  '&:hover': { borderColor: 'primary.main' },
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <UploadFileIcon sx={{ fontSize: 40 }} />
                <Typography>
                  {selectedFile ? `File Selected: ${selectedFile.name}` : 'Drag & drop or click to upload'}
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
                  Supports PDF, DOC, DOCX up to 10MB
                </Typography>
              </Box>

              <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
                Upload
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );

  return (
    <ThemeProvider theme={getTheme('light')}>
      <CssBaseline />
      <Box component="main" sx={{ p: 3, backgroundColor: 'background.default' }}>
        {currentView === 'materials' ? renderMaterialsView() : renderUploadView()}
      </Box>
    </ThemeProvider>
  );
}
