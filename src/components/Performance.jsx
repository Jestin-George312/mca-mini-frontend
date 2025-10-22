import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Card, Stack, Select, MenuItem, CircularProgress, FormControl, InputLabel } from '@mui/material'; // ✅ Added FormControl & InputLabel
// ✅ Import Recharts components
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Performance = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ✅ --- State for filters ---
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all'); // ✅ New state for topic

  // ✅ Fetch data from your new API (unchanged)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await fetch('http://127.0.0.1:8000/api/reports/performance-summary/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch performance data');
        }
        const fetchedData = await res.json();
        setData(fetchedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // Runs once on component mount

  // ✅ --- NEW: Calculate available topics based on selected subject ---
  const availableTopics = useMemo(() => {
    if (!data || selectedSubject === 'all') {
      return []; // No topics to show if "All Subjects" is selected
    }
    // Get all chart entries for the selected subject
    const subjectTopics = data.chart_data.filter(
      (item) => item.subject === selectedSubject
    );
    // Get the unique topic names from those entries
    const uniqueTopicNames = [
      ...new Set(subjectTopics.map((item) => item.topic)),
    ];
    return uniqueTopicNames;
  }, [data, selectedSubject]);


  // ✅ --- UPDATED: Filter chart by subject AND topic ---
  const filteredChartData = useMemo(() => {
    if (!data) return [];
    
    let filtered = data.chart_data;

    // 1. Filter by Subject
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(item => item.subject === selectedSubject);
    }

    // 2. Filter by Topic (only if a subject is also selected)
    if (selectedSubject !== 'all' && selectedTopic !== 'all') {
      filtered = filtered.filter(item => item.topic === selectedTopic);
    }
    
    return filtered;
  }, [data, selectedSubject, selectedTopic]);


  // ✅ --- NEW: Handler to reset topic when subject changes ---
  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedTopic('all'); // Reset topic filter
  };


  // ✅ Show loading or error states (unchanged)
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading performance data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  // ✅ Main component (now with real data)
  return (
    <Stack id='performance' sx={{ mt: 0 }}>
      {/* --- Performance Banner --- (unchanged) */}
      <Box sx={{
        p: { xs: 4, md: 8 },
        background: 'linear-gradient(135deg, #b9f2ea 0%, #b7e1ff 100%)',
        textAlign: 'left'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Performance</Typography>
        <Typography variant="body1" color="text.secondary">Track your learning progress and subject mastery.</Typography>
      </Box>

      {/* --- Learning Rate Card --- (unchanged) */}
      <Card elevation={6} square sx={{ mx: { xs: 2, md: 6 }, mt: -4, borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ p: { xs: 2, md: 4 }, background: 'linear-gradient(180deg, #f6fbff 0%, #f0f7ff 100%)' }}>
          
          {/* --- Header section with filters --- */}
          <Box sx={{ 
            display:'flex', 
            flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile
            justifyContent:'space-between', 
            alignItems:'flex-start', 
            mb: 2,
            gap: 2 // Add gap
          }}>
            {/* Learning Rate (unchanged) */}
            <Box>
              <Typography color="text.secondary" variant="body2">Overall Learning Rate</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1976d2' }}>
                {data.learning_rate.toFixed(0)}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Based on all quizzes taken
              </Typography>
            </Box>
            
            {/* ✅ --- UPDATED FILTER SECTION --- */}
            <Box sx={{ display:'flex', alignItems:'center', gap: 2, width: { xs: '100%', md: 'auto' } }}>
              {/* Subject Dropdown */}
              <FormControl size="small" fullWidth>
                <InputLabel id="subject-select-label">Subject</InputLabel>
                <Select 
                  labelId="subject-select-label"
                  label="Subject"
                  value={selectedSubject}
                  onChange={handleSubjectChange} // Use new handler
                  sx={{ minWidth: 140, backgroundColor: '#fff' }}
                >
                  <MenuItem value={'all'}>All Subjects</MenuItem>
                  {data.subjects.map((subject) => (
                    <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              {/* ✅ --- NEW TOPIC DROPDOWN --- */}
              <FormControl size="small" fullWidth>
                <InputLabel id="topic-select-label">Topic</InputLabel>
                <Select
                  labelId="topic-select-label"
                  label="Topic"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  disabled={selectedSubject === 'all'} // Disable if no subject is selected
                  sx={{ minWidth: 140, backgroundColor: '#fff' }}
                >
                  <MenuItem value={'all'}>All Topics</MenuItem>
                  {availableTopics.map((topicName) => (
                    <MenuItem key={topicName} value={topicName}>{topicName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* ✅ --- Real Recharts Chart --- (unchanged) */}
          <Box sx={{ height: 320, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={filteredChartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#555' }} />
                <YAxis unit="%" tick={{ fontSize: 12, fill: '#555' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value, name, props) => [
                    `${value.toFixed(0)}%`, // Show percentage
                    `Topic: ${props.payload.topic}` // Show topic name in tooltip
                  ]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="percentage" 
                  stroke="#1976d2" 
                  fill="url(#colorUv)" 
                  fillOpacity={1} 
                  strokeWidth={2}
                />
                 <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1976d2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1976d2" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          
        </Box>
      </Card>
    </Stack>
  )
}

export default Performance;