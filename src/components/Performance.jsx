import React from 'react'
import { Box, Typography, Card, Stack, Select, MenuItem } from '@mui/material'

const Performance = () => {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

  return (
    <Stack id='performance' sx={{ mt: 0 }}>
      {/* --- Performance Banner --- */}
      <Box sx={{
        p: { xs: 4, md: 8 },
        background: 'linear-gradient(135deg, #b9f2ea 0%, #b7e1ff 100%)',
        textAlign: 'left'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Performance</Typography>
        <Typography variant="body1" color="text.secondary">Track your learning progress and subject mastery.</Typography>
      </Box>

      {/* --- Learning Rate Card --- */}
      <Card elevation={6} square sx={{ mx: { xs: 2, md: 6 }, mt: -4, borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ p: { xs: 2, md: 4 }, background: 'linear-gradient(180deg, #f6fbff 0%, #f0f7ff 100%)' }}>
          <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', mb: 2 }}>
            <Box>
              <Typography color="text.secondary" variant="body2">Learning Rate</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1976d2' }}>85%</Typography>
              <Typography variant="caption" color="text.secondary">Last 7 Days 
                <Box component="span" sx={{ color: 'success.main', fontWeight: 700, ml: 1 }}>+5%</Box>
              </Typography>
            </Box>
            <Box sx={{ display:'flex', alignItems:'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">Subject:</Typography>
              <Select size="small" defaultValue={'all'} sx={{ minWidth: 140 }}>
                <MenuItem value={'all'}>All Subjects</MenuItem>
                <MenuItem value={'math'}>Math</MenuItem>
                <MenuItem value={'physics'}>Physics</MenuItem>
                <MenuItem value={'chem'}>Chemistry</MenuItem>
              </Select>
            </Box>
          </Box>

          {/* Chart placeholder with smooth curve vibe */}
          <Box sx={{
            height: 320,
            borderRadius: 2,
            background: 'linear-gradient(180deg, rgba(25,118,210,0.08) 0%, rgba(25,118,210,0.02) 100%)',
            mb: 2,
            boxShadow: 'inset 0 -40px 60px rgba(25,118,210,0.06)'
          }} />

          {/* X axis labels */}
          <Box sx={{ display:'grid', gridTemplateColumns:'repeat(7, 1fr)' }}>
            {days.map((d) => (
              <Typography key={d} align="center" variant="caption" color="text.secondary">{d}</Typography>
            ))}
          </Box>
        </Box>
      </Card>
    </Stack>
  )
}

export default Performance


