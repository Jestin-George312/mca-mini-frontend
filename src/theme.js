import { createTheme } from "@mui/material"

const theme=createTheme(
    {
        palette:{
           primary:{
            main:"#fff"
           },
           secondary:{
            main:"rgb(0,0,0)"
           }
        },
        components:{
            MuiButton:{
                styleOverrides:{
                    root:{
                        textTransform:'none'
                    }
                }
            }
        }
    }
)
export default theme
