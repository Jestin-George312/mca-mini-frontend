import { Box, Typography, Container, Card,CardContent,CardActions ,Button } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid'

const Features=[
 {
   title:"Smart material upload",
   description:"blahh1"
 },
  {
   title:"AI powered planning",
   description:"blahh2"
 },
  {
   title:"Adaptive Scheduling",
   description:"blahh3"
 },
  {
   title:"Performance Analysis",
   description:"blahh4"
 },
  {
   title:"Interactive Quizess",
   description:"blahh5"
 },
 {
   title:"Smart Notifications",
   description:"blahh6"
 },
]




const hero_features = () => {
    const bull = '•'
  return (
    <Box id="features">
    <Typography variant="h3">Intelligent Features for Smart Learning</Typography>
    <Typography variant="body2">Our AI powered platform combines cutting-edge technologies for improved learning</Typography>
    <Grid container spacing={3} sx={{padding:3,justifyContent:'center'}}>
      {Features.map((feature)=>(

          <Grid item xs={12} sm={6} md={4}>
            
           <Card sx={{ minWidth: 275 }}>
                    
         <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>

           </Card>
            
            
            </Grid>    
 
      ))}
    


    </Grid>

    </Box>
  )
}

export default hero_features
