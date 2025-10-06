import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'
import {useTheme} from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'


const splash_navbar = () => {
  const navigate = useNavigate();

  const theme=useTheme()
  return (
    <div>
      <AppBar  color="secondary" sx={{position:"sticky",top:0}}>
       <Container  maxWidth={false}>
           <Toolbar sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <Typography variant="h4">
            hello
          </Typography>
          <Box sx={{ width:"40%",display:"flex",justifyContent:'space-evenly'}}>
            <Button variant="contained" color="success"   href='#home'>
             home
           </Button>
           <Button variant="contained" color="success" onClick={()=>navigate('/login')} >
             Login
           </Button>
            <Button variant="contained" color="success" onClick={()=>navigate('/signup')} >
             Signup
           </Button>
           <Button variant="contained" color="success" href='#signup'>
             Get Started
           </Button>
        </Box>

        </Toolbar>
       </Container>
      </AppBar>
    </div>
  )
}

export default splash_navbar
