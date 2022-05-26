import * as React from 'react';
import { Box, Typography } from "@mui/material";



import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { blue } from '@mui/material/colors';


export default function Links() {

    return (

        <Box sx={{
            width: '100%',
            display: 'flex', justifyContent: 'flex-start', position: 'absolute', top: '0px'
        }}>
            <Link link="https://github.com/JoshuaPeddle" text="Github " target='github' />  <Link link="https://ca.linkedin.com/in/joshua-peddle" text='LinkedIn ' target='linkedin' />

        </Box>
    )
}

function Link(props) {

    const buttonStyle = {
        fontSize: 50, padding: '0px', margin: '0px'
    }


    const link = (key) => {
        switch (key) {
            case "github":
                return <GitHubIcon sx={{ ...buttonStyle, ...{ color: 'black' } }}></GitHubIcon>;
            case "linkedin":
                return <LinkedInIcon sx={{ ...buttonStyle, ...{ color: blue[600] } }}></LinkedInIcon>;
            default:
                return "";
        }
    }


    const handleClick = () => {

        window.location.href = props.link
    }

    return (

        <Box onClick={handleClick} sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            width: 'auto', height: 'auto', backgroundColor: '#ffffff05', borderRadius: '10px', padding: '10px'
        }}>

            <Typography sx={{ color: "#EEF0F2bb", padding: '0px', margin: '0px' }} variant={'h5'}> {props.text} </Typography>{link(props.target)}
        </Box>
    )

}