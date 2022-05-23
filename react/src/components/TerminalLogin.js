
import { Component } from 'react';
import Box from '@mui/material/Box';
import { Zoom } from '@mui/material';

import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

import MinimizeIcon from '@mui/icons-material/Minimize';
const timeout = 50;




class TerminalLogin extends Component {


  constructor(props) {
    super(props)

    this.state = {
      current_username: "",
      current_password: "",
      char_index: 0,
      pwBlinkerClr: '#111',
      unBlinkerClr: 'secondary.main',
      done: false,
      shouldHide: false,
      
    }
    this.drawUsername = this.drawUsername.bind(this)
    this.drawPassword = this.drawPassword.bind(this)
  }

  randDelay(delay, percent) {
    return Math.random() * percent * delay + delay
  }

  drawUsername() {

    let current_text = this.state.current_username;
    let username = this.props.username;

    if (username !== current_text) {
      // Not done writing word
      this.setState({
        current_username: username.slice(0, this.state.char_index),
        char_index: this.state.char_index + 1
      }, () => { this.interval = setTimeout(() => { this.drawUsername() }, this.randDelay(timeout, .2)) })

    } else {
      // Done writing word
      this.setState({
        char_index: 0,
        password_label: "password: ",
        pwBlinkerClr: 'secondary.main',
        unBlinkerClr: '#000'
      },
        () => { this.interval = setTimeout(() => { this.drawPassword() }, 300) })

    }
  }

  drawPassword() {

    let current_text = this.state.current_password;
    let password = "**************";

    if (password !== current_text) {
      // Not done writing word
      this.setState({
        current_password: password.slice(0, this.state.char_index),
        char_index: this.state.char_index + 1
      }, () => { this.interval = setTimeout(() => { this.drawPassword() }, this.randDelay(timeout, .2)) })

    } else {
      // Done writing word
      this.setState({ done: true },()=>{this.interval = setTimeout(() => { this.setState({shouldHide:true}) }, 100) })
      console.log('done', this.props)
      this.props.done()
    }
  }

  componentDidMount() {
    this.interval = setTimeout(() => { this.drawUsername() }, timeout)
  }

  componentWillUnmount() {
    clearTimeout(this.interval)
    console.log('unmounting')
  }

  render() {
    let finish_text = ""
    if (this.state.done) {
      finish_text = (

        <section>
        <p style={{ margin: "0px" }}>
        Using username "{this.state.current_username}".
        </p>
        <p style={{ margin: "0px", textAlign:"justify" }}>
        Welcome to Ubuntu 20.04.4 LTS
        </p>

        </section>

        )
    }
    return (
      <Zoom in={!this.state.shouldHide} unmountOnExit>

        <Box onClick= {()=>{this.setState({shouldHide:true},()=>{this.props.done()}) }} sx={{
          borderStyle: "outset",
          borderWidth: "5px",
          borderColor: "#333",
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          top: `100px !important`,
          left: `14vw !important`,
          position: 'fixed',
          overflow: 'hidden',
          minHeight: '300px',
          height: '35vh',
          maxHeight: '40vh',
          maxWidth: '300px',
          width: '300px',
          minWidth: '300px',
          background: "#111",
          color: "secondary.main",
        }}>

          <div style={{ width: '100%', height: '30px', display: 'flex', justifyContent: "flex-end", borderBottomStyle: "groove", borderColor: "#666" }}> <MinimizeIcon /> <HighlightOffTwoToneIcon sx={{ color: 'red' }} />   </div>
          <p style={{ margin: "0px" }}>
            username: {this.state.current_username}  <BlinkingCursor color={this.state.unBlinkerClr} />
          </p>

          <p style={{ margin: "0px" }}>
            {this.state.password_label}{this.state.current_password}<BlinkingCursor color={this.state.pwBlinkerClr} />
          </p>
        {finish_text ? finish_text : ""}
        </Box>
      </Zoom>
    )
  };


}


class BlinkingCursor extends Component {


  constructor(props) {
    super(props)
    this.state = {
      opacity: 0,
      increasing: true
    }
    console.log(this.props)
    this.changeOpacity = this.changeOpacity.bind(this)
  }

  changeOpacity() {
    if (this.state.increasing === true) {
      this.setState({ opacity: this.state.opacity + 0.1 })
      if (this.state.opacity >= .7) {
        this.setState({ increasing: false })
      }

    } else {
      this.setState({ opacity: this.state.opacity - 0.1 })
      if (this.state.opacity <= -0.51) {
        this.setState({ increasing: true })
      }
    }
    this.interval = setTimeout(() => { this.changeOpacity() }, 40)
  }


  componentDidMount() {
    this.interval = setTimeout(() => { this.changeOpacity() }, 50)
  }

  componentWillUnmount() {
    clearTimeout(this.interval)
  }


  render() {

    return (
      <Box component="span" display="inline" sx={{
        opacity: this.state.opacity,
        color: "inherit",
        minWidth: 10,
        maxWidth: 10,
        minHeight: 10,
        maxHeight: 10,
        zindex: 3,
        backgroundColor: this.props.color,
      }}>&nbsp;</Box>
    )
  };

}

export default TerminalLogin;