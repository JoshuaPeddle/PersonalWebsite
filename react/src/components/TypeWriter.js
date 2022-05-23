
import { Component } from 'react';
import Box from '@mui/material/Box';


const timeout = 110;
const delayAfterDone = 2000;

class TypeWriter extends Component {


  constructor(props) {
    super(props)
    this.state = {
      current_text: "",
      str_index: 0,
      char_index: 0
    }
    this.updateString = this.nextLetter.bind(this)
    this.eraseWord = this.eraseWord.bind(this)
    this.randDelay = this.randDelay.bind(this)
  }

  render() {

    return (

      <Box sx={{ color: this.props.color , zIndex : 1, transform:'scale(1.8)'}}>
        <p style ={{caretColor:'transparent'}}>{this.props.title}</p>

        <p style ={{caretColor:'transparent'}}> {this.props.header} {this.state.current_text}<BlinkingCursor color={this.props.color} /></p>

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
      }, () => { this.interval = setTimeout(() => { this.nextLetter() }, this.randDelay(timeout, .2)) })

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
      }, () => { this.interval = setTimeout(() => { this.eraseWord() }, this.randDelay(130, .3)) })

    } else {
      this.setState({
        str_index: (this.state.str_index + 1) % this.props.strings.length,
        char_index: 0
      }, () => { this.interval = setTimeout(() => { this.nextLetter() }, delayAfterDone / 4) })

    }

  }


  componentDidMount() {
    this.interval = setTimeout(() => { this.nextLetter() }, timeout)
  }

  componentWillUnmount() {
    clearTimeout(this.interval)
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