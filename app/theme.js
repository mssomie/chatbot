// theme.js
import { createTheme } from '@mui/material/styles';
import { Signika, Rubik } from "next/font/google";

const signika = Signika({ subsets: ["latin"] });
const rubik = Rubik({subsets: ["latin"]});


const theme = createTheme({
fontClassName: signika.className,

  palette: {
    background: {
      default: '#111E24', 
    },
    primary: {
      main: '#ecebf9', 
    },
    secondary: {
      main: '#584af1', 
    },
    text: {
      primary: '#E4E8E9', 
    },
    card: {
      main: '#1C2E37', 
    },
  },

  typography:{
    fontFamily: signika.style.fontFamily,
    h1:{
        fontSize: '44px',
        fontWeight: 700
    },
    h2:{
        fontSize: '36px',
        fontWeight: 500
    },
    h3:{
        fontSize: '24px',
        // fontWeight: 700
    },
    body1:{
        fontSize: '16px',
        // fontWeight: 700
    },
    body2:{
      fontSize: '16px',
      fontWeight: 200
  },
    label:{
        fontSize: '16px',
        fontWeight: 300,
        color: '#4c5e63',
    },
    button: {
        fontFamily: signika.style.fontFamily,
        fontSize: '14px',
        textTransform: 'none', 
      },

  },

  components: {
    
    // MuiMenuItem: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: '#0f171A', // Set the background color of the menu item
    //       color: '#FFFFFF', // Set the default text color
    //       '&:hover': {
    //         backgroundColor: '#0f171A', // Keep background color on hover
    //         color: '#02E6A2', // Change text color on hover
    //         border: '1px solid #02E6A2', // Add border on hover
    //       },
    //       '&.Mui-selected': {
    //         backgroundColor: '#0f171A', // Keep background color when selected
    //         color: '#02E6A2', // Change text color when selected
    //         border: '1px solid #02E6A2', // Add border when selected
    //       },
    //       '& input': {
    //         fontFamily: signika.style.fontFamily,
    //         fontSize: '14px',
    //       },
    //     },
    //   },
    // },
    MuiInputBase: {
        styleOverrides: {
          input: {
            '&::placeholder': {
              color: 'white',  // Change this to your desired color
              opacity: 1,    // Ensure full opacity for the color
            },
          },
        },
      },
    MuiTextField: {
      styleOverrides: {
        root: {
         
          '& input': {
            fontFamily: signika.style.fontFamily,
            fontSize: '14px',
            border: '1px solid #584af1',
            borderRadius:'16px',
            color: '#ecebf9',
        
          },
        },
      },
    },
    MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: signika.style.fontFamily,
            fontSize: '14px',
            textTransform: 'none', // Prevent text transformation
            borderRadius: '16px',
            backgroundColor:'#584af1',
            color:'white'
          },
        },
      },
    MuiInputAdornment: {
        styleOverrides: {
          root: {
            fontFamily: signika.style.fontFamily,
            fontSize: '14px', 
          },
        },
    },
  },
});


export default theme;