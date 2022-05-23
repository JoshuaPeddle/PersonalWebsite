import "./App.css";
import * as React from 'react';


import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red, green } from '@mui/material/colors';
import { TextField, Box, Button, Typography,  Zoom, Fade } from "@mui/material";


import TypeWriter from "./components/TypeWriter";

import TerminalLogin from "./components/TerminalLogin";

import SendIcon from '@mui/icons-material/Send';


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#EEF0F2bb",
    },
    secondary: {
      main: "#8DE969dd",
      light: "#8DE969aa",
      dark: "#8DE969ff",
    },
    bg: {
      main: "#16181d",
      light: "#161821"
    }

  },
});



const title = " Hi, I'm Josh. "
const header = ""
const strings =
  [
    "Web Development.",
    "Machine Learning.",
    "Data science.",
    "Video Game design."
  ]


class App extends React.Component {


  constructor(props){
    super(props)
    this.fadeIn = this.fadeIn.bind(this);
    this.state ={shouldFadeIn: false}
  }

  fadeIn(){
    console.log("called!")
    this.setState({shouldFadeIn:true})
  }

  render() {

    return (

      <ThemeProvider theme={theme}>
        

        <div className="App" style={{width:'100%',height:'100vh', background: theme.palette.bg.light}}>
        <TerminalLogin username={"CrashOverride"} done={this.fadeIn}  ></TerminalLogin>
        <Fade in={this.state.shouldFadeIn} unmountOnExit>
          <header style={{ background: theme.palette.bg.light }} className="App-header">
          
          
            <TypeWriter color={"secondary.main"} title={title} header={header} strings={strings} />

            <div> <p> </p></div>

          
          </header>
          </Fade>

          <Fade in={this.state.shouldFadeIn} unmountOnExit>
          <header style={{ background: theme.palette.bg.main }} className="App-header">

            { /*<ProjectView  title ="notesapp.cloud"/>*/}

          </header>
          </Fade>
          <Fade in={this.state.shouldFadeIn} unmountOnExit>
          <header style={{ background: theme.palette.bg.light }} className="App-header">
            


            <Box  sx={{
              input: { color: 'primary.main', fontSize: 20 },
              label: { color: 'secondary.light', fontSize: 18 },
              textarea: { color: 'primary.main', fontSize: 20 },
              width: '95%', maxWidth: '1080px',
    
            }}>
              <Typography style ={{caretColor:'transparent'}} variant="h2" component="h2" color={'primary'}> Contact</Typography>
              <br />
              <TextField id="filled-basic1" label="Full Name" variant="outlined" color={'secondary'} sx={{ width: "33%", minWidth: '360px', background:"#00000030" }} />
              <TextField id="filled-basic2" autoComplete="email" label="Email" variant="outlined" color={'secondary'} sx={{ width: "33%", minWidth: '360px' , background:"#00000030"}} />
              <TextField id="filled-basic3" label="Phone" variant="outlined" color={'secondary'} sx={{ width: "33%", minWidth: '360px' , background:"#00000030"}} />
              <div style={{width:"100%", minHeight:"10px"}}></div>
              <TextField id="filled-basic4"  size="large" sx={{background:"#00000030",  textarea: { fontSize: 22,   } }} label="Message" variant="outlined" rows={15} color={'secondary'} multiline fullWidth />
              <br />
              <Button sx={{ borderColor: 'secondary.main'  }} variant="outlined"><SendIcon sx={{ color: 'secondary.main' }} /></Button>
            </Box>
  
          </header>
          </Fade>
        </div>


      </ThemeProvider>

    )
  };



}

export default App;