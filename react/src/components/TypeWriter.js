
import React, { Component } from 'react';
import Box from '@mui/material/Box';
import * as ReactDOM from 'react-dom';

let timeout = 120;
const delayAfterDone = 2000;
let timeBetweenScreenChecks = 100;
let opacityTimeout = 60;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

class TypeWriter extends Component {

  
  constructor(props) {
    super(props)
    this.state = {
      current_text: "",
      str_index: 0,
      char_index: 0,
      off_screen: false
    }
    this.updateString = this.nextLetter.bind(this);
    this.eraseWord = this.eraseWord.bind(this);
    this.randDelay = this.randDelay.bind(this);
    this.isInScreen = this.isOnScreen.bind(this);

    this.mainRef = React.createRef();
  }




  render() {

    return (

      <Box ref={this.mainRef} sx={{ p: {fontSize: "5vw"}, color: this.props.color , zIndex : 1}}>
        
        <h1 style ={{caretColor:'transparent', margin:'25px'}}>{this.props.title}</h1>

        <h4 style ={{caretColor:'transparent', margin:'25px'}}> {this.props.header} {this.state.current_text}<BlinkingCursor color={this.props.color} /></h4>

      </Box>
    )
  };

  randDelay(delay, percent) {
    return Math.random() * percent * delay + delay
  }

  nextLetter() {

    let current_text = this.state.current_text;
    let selected_string = this.props.strings[this.state.str_index];

    if (selected_string !== current_text) {
      // Not done writing word
      this.setState({
        current_text: selected_string.slice(0, this.state.char_index),
        char_index: this.state.char_index + 1
      }, () => { this.interval = setTimeout(() => { this.nextLetter() }, timeout) })

    } else {
      // Done writing word
      this.interval = setTimeout(() => { this.eraseWord() }, delayAfterDone)
    }
  }

  eraseWord() {
    let selected_string = this.props.strings[this.state.str_index];

    if (this.state.current_text !== "") {
      this.setState({
        current_text: selected_string.slice(0, this.state.char_index),
        char_index: this.state.char_index - 1
      }, () => { this.interval = setTimeout(() => { this.eraseWord() }, timeout) })

    } else {
      this.setState({
        str_index: (this.state.str_index + 1) % this.props.strings.length,
        char_index: 0
      }, () => { this.interval = setTimeout(() => { this.nextLetter() }, delayAfterDone / 4) })

    }

  }

  /**
   * Want a good balance between time between checking and usefulness of disabling the timeouts
   */
  isOnScreen() {

    let node = ReactDOM.findDOMNode(this.mainRef.current)
    let yLoc = node.getBoundingClientRect().y
    if (yLoc < -200 && this.state.off_screen === false){ // More than 200 off screen
      this.setState({off_screen:true, current_text:'', char_index:0})
      console.log('slowing things down...')
      opacityTimeout = 3000;
      timeout = 3000;
      timeBetweenScreenChecks = 500;
    }else if (yLoc > -200 && this.state.off_screen === true){
      this.setState({off_screen:false})
      console.log('speeding things up...')
      opacityTimeout = 40;
      timeout = 110;
    }
    // Queue another check
    this.screenCheckInterval = setTimeout(() => { this.isOnScreen() }, timeBetweenScreenChecks)
  }



  componentDidMount() {
    this.interval = setTimeout(() => { this.nextLetter() }, timeout)
    this.screenCheckInterval = setTimeout(() => { this.isOnScreen() }, timeBetweenScreenChecks)
  }

  componentWillUnmount() {
    clearTimeout(this.interval)
    clearTimeout(this.screenCheckInterval)
  }


}



class BlinkingCursor extends Component {


  constructor(props) {
    super(props)
    this.state = {
      opacity: 0,
      increasing: true
    }
    this.changeOpacity = this.changeOpacity.bind(this)
  }

  changeOpacity() {
    if (this.state.increasing === true) {
      this.setState({ opacity: this.state.opacity + 0.15 })
      if (this.state.opacity >= .8) {
        this.setState({ increasing: false })
      }

    } else {
      this.setState({ opacity: this.state.opacity - 0.15 })
      if (this.state.opacity <= -0.51) {
        this.setState({ increasing: true })
      }
    }
    this.interval = setTimeout(() => { this.changeOpacity() }, opacityTimeout)
  }


  componentDidMount() {
    this.interval = setTimeout(() => { this.changeOpacity() }, 50)
  }

  componentWillUnmount() {
    clearTimeout(this.interval)
  }


  render() {
    return (
      <Box component="span" display="inline" sx= {{
        opacity: this.state.opacity,
        color: "inherit",
        minWidth: 10,
        maxWidth: 10,
        minHeight: 10,
        maxHeight: 10,
        backgroundColor: this.props.color,
      }}>&nbsp;</Box>
    )
  };

}

export default TypeWriter;