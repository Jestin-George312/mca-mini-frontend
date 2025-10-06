import React from 'react'
import {
    Box,
    Card,
    CardMedia,
    Container,
    Stack, // Import Stack
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material'
import bookImg from '../assets/images/hero-study-planner.jpg'

const Home = () => {
    const recentlyAccessed = [
        { title: 'Calculus', subtitle: 'Chapter 1', img: bookImg, bg: 'linear-gradient(135deg, #f7f2e7 0%, #fff 100%)' },
        { title: 'Physics', subtitle: 'Chapter 2', img: bookImg, bg: 'linear-gradient(135deg, #fde9e3 0%, #fff 100%)' },
        { title: 'Chemistry', subtitle: 'Chapter 3', img: bookImg, bg: 'linear-gradient(135deg, #eef2ff 0%, #fff 100%)' },
        { title: 'Biology', subtitle: 'Chapter 4', img: bookImg, bg: 'linear-gradient(135deg, #f6f1e9 0%, #fff 100%)' },
    ]

    const recentQuizzes = [
        { subject: 'Calculus', topic: 'Limits', score: '85%', time: '20 min' },
        { subject: 'Physics', topic: 'Mechanics', score: '78%', time: '25 min' },
        { subject: 'Chemistry', topic: 'Reactions', score: '92%', time: '18 min' },
    ]

    return (
        <Container id='home' maxWidth={false} sx={{ mt: 4, px: { xs: 2, md: 6 } }}>
            {/* Replaced Grid container with a Stack for simple vertical layout and spacing */}
            <Stack spacing={5}>

                {/* --- Welcome Section --- */}
                {/* This Box uses negative margins to span the full width, ignoring container padding */}
                <Box sx={{
                    p: { xs: 3, md: 5 },
                    mx: { xs: -2, md: -6 },
                    borderRadius: 0,
                    background: 'linear-gradient(135deg, #3ea6ff 0%, #7b61ff 100%)',
                    color: 'white',
                }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1 }}>Welcome back, Alex</Typography>
                    <Typography variant="body1" sx={{ opacity: 0.95, mt: 1 }}>Continue where you left off</Typography>
                </Box>

                {/* --- Recently Accessed Section --- */}
                <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Recently accessed</Typography>
                    {/* A nested Stack for the cards ensures they are vertical and spaced out */}
                    <Stack spacing={2.5}>
                        {recentlyAccessed.map((item) => (
                            <Card
                                key={item.title}
                                elevation={0}
                                sx={{
                                    p: 2.5,
                                    width: '100%',
                                    borderRadius: 4,
                                    background: item.bg,
                                    boxShadow: 'inset 0 0 1px rgba(0,0,0,0.06)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 3,
                                    transition: 'transform 200ms ease, box-shadow 200ms ease',
                                    '&:hover': { transform: 'translateY(-2px)', boxShadow: 6 }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={item.img}
                                    alt={item.title}
                                    sx={{
                                        width: { xs: 100, sm: 160 },
                                        height: { xs: 80, sm: 120 },
                                        objectFit: 'cover',
                                        borderRadius: 2,
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.18)'
                                    }}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 800 }}>{item.title}</Typography>
                                    <Typography color="text.secondary" variant="body2">{item.subtitle}</Typography>
                                </Box>
                            </Card>
                        ))}
                    </Stack>
                </Box>

                {/* --- Recent Quiz Attempts Section --- */}
                <Box>
                    <Typography variant="h6" sx={{ mb: 2, mt: 1, fontWeight: 700 }}>Recent quiz attempts</Typography>
                    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Subject</TableCell>
                                    <TableCell>Topic</TableCell>
                                    <TableCell>Score</TableCell>
                                    <TableCell>Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recentQuizzes.map((row) => (
                                    <TableRow key={row.subject} hover>
                                        <TableCell>{row.subject}</TableCell>
                                        <TableCell>{row.topic}</TableCell>
                                        <TableCell>{row.score}</TableCell>
                                        <TableCell>{row.time}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Stack>
        </Container>
    )
}

export default Home