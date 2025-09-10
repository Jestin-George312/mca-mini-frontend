import React from 'react'
import {Container,Box,Typography,Stack,Button} from '@mui/material'
import Heroimage from "../assets/images/hero-study-planner.jpg"
import { useNavigate } from 'react-router-dom'

const hero1_splash = () => {
    const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");  // Redirects to signup page
  };

  return (
    <div>
      <Container id="Home"  maxWidth={false} disableGutters>
       <Box color="primary" sx={{display:"flex",justifyContent:"space-between", height:"600px",width:"100%",}}>
         <Box  sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"50%",}}>
            <Typography variant="h2" color="initial" sx={{margin:'10px'}}> Master your Study time with AI  <span> Precision</span> </Typography>
            <Typography variant="h6" color="initial" sx={{margin:'10px'}}>Transform your learning journey with personalized study plans,
              intelligent topic extractionand adaptive scheduling that evolves with your progress
            </Typography>
             <Button variant='outlined' sx={{margin: '10px', backgroundImage: 'linear-gradient(to right, #2196f3, #21cbf3)',color: '#fff',
                 border: 'none',paddingX: 3, paddingY: 1, borderRadius: '8px','&:hover': {backgroundImage: 'linear-gradient(to right, #1976d2, #1e88e5)',},
              }} onClick={handleGetStarted}>start learning</Button>
         </Box>
         <Box sx={{display:"flex",flexDirection:"column",width:"50%",height:"100%",justifyContent:"center",alignItems:"center"}}>
          <img src={Heroimage} alt="" style={{ width: "90%", height: "90%", objectFit: "cover",borderRadius:"2rem" }}/>
         </Box>
        </Box> 
      </Container>
    </div>
  )
}

export default hero1_splash

