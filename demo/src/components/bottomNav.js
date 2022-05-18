import {Component} from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';



export default class SimpleBottomNavigation extends Component {
  

  constructor(props){
    super(props);
    this.state = {currentlySelected : props.initialState}
    this.cb = props.onChange
  }

   render() {return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation
        showLabels
        value={this.state.currentlySelected}
        onChange={(event, newValue) => {
          this.setState({currentlySelected : newValue}, ()=>{
            this.cb(newValue)
          })
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>);
    };


}