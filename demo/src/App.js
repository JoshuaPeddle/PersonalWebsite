import react, {Component} from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SimpleBottomNavigation from "./components/bottomNav";
import "./App.css";
import { Paper } from '@mui/material';


class App extends Component {

  constructor(props){

    super(props);
    this.state ={navState : 0};
    console.log(this.state)
    this.onNavChange = this.onNavChange.bind(this)
  }

  onNavChange(value){
    console.log("got Callback "+value)
    this.setState({navState: value}, () =>{
      console.log(this.state)
    })
  }

  getView(num){
  
    let view0 = (
      <header className="App-header">
          <TextField multiline={false} rows='11' variant='filled'  sx={{
              backgroundColor: '#cccccc',
              width: '90%'
            }}/>
  
          <TextField multiline={true} rows='10' variant='filled' fullWidth sx={{
              backgroundColor: '#cccccc',
              width: '95%'
            }}/>
  
          <Button variant="contained">{this.state.navState}</Button>
  
          <form action="../../" method="POST" 
                className="form">
            <button type="submit">Connected?</button>
          </form>
          <button/>
      </header>
      
       );

    let view1 = (    
    <header className="App-header">


    <Button variant="contained">{this.state.navState}</Button>

    <form action="../../" method="POST" 
          className="form">
      <button type="submit">Connected?</button>
    </form>
    <button/>
</header>);


    let view2 = (
    <header className="App-header">

    <Button variant="contained">{this.state.navState}</Button>

    <form action="../../" method="POST" 
          className="form">
      <button type="submit">Connected?</button>
    </form>
    <button/>
</header>);


    let views=[view0, view1, view2]

      return views[num];
  }


 


  render() {return (
    <div className="App">

    {this.getView(this.state.navState)}
    <Paper sx={ {position:"fixed", bottom:0, left:0, right:0}}>
    <SimpleBottomNavigation  initialState={0} onChange={this.onNavChange}></SimpleBottomNavigation>
    </Paper>
    </div>)};
}
  
export default App;