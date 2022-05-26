
import { Component } from 'react';
import Box from '@mui/material/Box';
import SinWave from "./SinWave";


class SinWaveGroup extends Component {


  constructor(props) {
    super(props)
    this.state = {

    }

  }

  
  render() {

    return (
       
        <SinWave top={"-100px"} color={'#02260288'} />
   
    )
  };





}



export default SinWaveGroup;