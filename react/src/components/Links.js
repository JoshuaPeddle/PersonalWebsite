import * as React from 'react';
import { Box, Typography } from "@mui/material";



import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { blue } from '@mui/material/colors';

const links_to_display = {
    github: { link: "https://github.com/JoshuaPeddle", text: "Github ", target: 'github' },
    linkedin: { link:"https://ca.linkedin.com/in/joshua-peddle", text:'LinkedIn', target:'linkedin' }
}



export default function Links() {



    const GetLinks = () =>{
        let html = [];
        Object.keys(links_to_display).forEach(key=>{
            let el = links_to_display[key]

            html.push(<Link key={key} link={el.link} text={el.text} target={el.target} />)
        })
        return html
    }

    return (

        <Box sx={{
            width: '100%',
            display: 'flex', justifyContent: 'space-between', position: 'absolute', top: '0px'
        }}>
            <GetLinks/>
        </Box>
    )
}

function Link(props) {

    const buttonStyle = {
        fontSize: "calc(49px + 1.5vw)", padding: '0px', margin: '0px'
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
        window.location.assign(props.link)
    }

    return (

        <Box onClick={handleClick} sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            width: 'auto', height: 'auto', background: 'radial-gradient(circle,  rgba(255,255,255,0.04) 0%, rgba(128,128,200,0.05) 20%, rgba(128,128,200,0.08) 100%);', 
            borderRadius: '20px', padding: "calc(5px + 1vw)", borderStyle:'outset', borderColor:'rgba(128,128,200,0.08)', borderWidth:'5px', margin:'1%'
        }}>

            <Typography sx={{ fontSize: "calc(16px + 0.7vw)",color: "#EEF0F2bb", padding: '0px', margin: '0px' }} variant={'h5'}> {props.text} </Typography>{link(props.target)}

        </Box>
    )

}