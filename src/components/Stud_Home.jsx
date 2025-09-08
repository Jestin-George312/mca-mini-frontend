import React from 'react'
import { Container,Grid,Card,CardContent,Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import QuizIcon from '@mui/icons-material/Quiz';
import MovingIcon from '@mui/icons-material/Moving';
const Stud_Home = () => {
    const Perks=[
     {
        head:"Study Hours This Week ",
        num:"24.5",
        improve:"+12% from last week",
        icon:<AccessTimeIcon sx={{ fontSize: 40, color: '#1976d2' }} />
     },{

        head:"Completed Topics ",
        num:"18",
        improve:"+8% from last week",
        icon:<TaskAltIcon sx={{ fontSize: 40, color: '#1976d2' }} />
     },
     {
         head:"Average Quizz scores ",
        num:"87%",
        improve:"+5% from last week",
        icon:<QuizIcon sx={{ fontSize: 40, color: '#1976d2' }} />
     },
      {
         head:"Learning Streak ",
        num:"12 days",
        improve:"+3% from last week",
        icon:<MovingIcon sx={{ fontSize: 40, color: '#1976d2' }} />
     }

    ]      
  return (
     <Container id='stud_home' disableGutters sx={{marginTop:5}}>
       <Grid container spacing={3}> 
   {Perks.map((feature)=>(
       <Grid item xs={12}  sm={6} md={4}>
           <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                          {feature.head}
                        </Typography>
                        <Typography variant="h5" component="div">
                         {feature.num}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{feature.improve}</Typography>
                        {feature.icon}
              </CardContent>
           </Card>
       </Grid>
    ))}

       </Grid>

     </Container>
  )
}

export default Stud_Home
