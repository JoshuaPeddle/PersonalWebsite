
import { Component } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import login from './NotesappLogin.png'

class ProjectView extends Component {


    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {

        return (
            <Box sx={{  minWidth: '300px',maxWidth: '700px',  borderColor: "secondary.light", borderStyle: "inset",
            padding:'0%', overflow:"hidden", borderRadius:'10px'}}>

                <Typography variant="h34" component="h4" color={'primary'}> {this.props.title} </Typography>
                <div style={{maxHeight:'600px', width:'600px', overflow:"hidden"}}>
                <img src={login} style={{ transform:'scale(0.4)', transformOrigin:'left top' }} ></img >
                </div>
            </Box>
        )
    };



}

export default ProjectView;