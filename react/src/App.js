import "./App.css";
import * as React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import {  Fade } from "@mui/material";


import TypeWriter from "./components/TypeWriter";
import TerminalLogin from "./components/TerminalLogin";

import Links from "./components/Links";
import Contact from "./components/Contact";

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
    tertiary: {
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

//<Pong/>
class App extends React.Component {

  constructor(props) {
    super(props)
    this.fadeIn = this.fadeIn.bind(this);
    this.state = { shouldFadeIn: false, showOverflow: 'hidden' };
  }

  fadeIn() {
    this.setState({ shouldFadeIn: true, showOverflow: 'visible' })
  }


  render() {
    return (

      <ThemeProvider theme={theme}>


        <div className="App" style={{ width: '100%', height: '100vh', background: theme.palette.bg.light, overflow:this.state.showOverflow }}>
          <TerminalLogin username={"CrashOverride"} done={this.fadeIn}  ></TerminalLogin>
          <Fade in={this.state.shouldFadeIn} style={{ transitionDelay: this.state.shouldFadeIn ? '200ms' : '0ms' }}   {...(this.state.shouldFadeIn ? { timeout: 1500 } : {})} >
            <header style={{ background: theme.palette.bg.light }} className="App-header">

            <Links />
              <TypeWriter  color={"secondary.light"} title={title} header={header} strings={strings} />

        

            </header>
          </Fade>



          
          <Fade in={this.state.shouldFadeIn} >
            <header style={{ background: theme.palette.bg.main }} className="App-header">

            
            
            </header>
          </Fade>

          <Fade in={this.state.shouldFadeIn} >
            <header style={{ background: theme.palette.bg.light }} className="App-header">

              <Contact />

            </header>
          </Fade>
        </div>


      </ThemeProvider>

    )
  };



}

export default App;