
import { Component } from 'react';
import Box from '@mui/material/Box';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red, green } from '@mui/material/colors';

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
      main: red[500]
    },
    secondary: {
      main: green[500]
    }
  },
});


class SignedName extends Component {


  constructor(props) {
    super(props);
    this.state = { mounted: false }
  }



  componentDidMount() {

    this.setState({ mounted: true }, () => console.log(this.state))
  }


  render() {

    return (
      <ThemeProvider theme={theme}>
        <Box>


          <div> 

          </div>

        </Box>
      </ThemeProvider>)
  };



}

export default SignedName;