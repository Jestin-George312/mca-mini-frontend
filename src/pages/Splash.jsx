import React from 'react'
import Splash_navbar from '../components/splash_navbar'
import Hero1_splash from '../components/hero1_splash'
import { ThemeProvider } from '@emotion/react'
import theme from '../theme'
import Hero_features from '../components/hero_features'

const Splash = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
     <Splash_navbar/>
     <Hero1_splash/>
     <Hero_features/>
      </ThemeProvider>
 
    </div>
  )
}

export default Splash
