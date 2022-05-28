import * as React from 'react';
import { Box, Typography } from "@mui/material";
import * as ReactDOM from 'react-dom';

import { Fade, Slide } from "@mui/material";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
export default function Hinter(props) {

    const [timeout, settimeout] = React.useState(null)
    const [showing, setShowing] = React.useState(false)

    const [onScreen, setOnScreen] = React.useState(true)

    const mainRef = React.useRef()

    const fontStyle = {
        fontSize: "calc(49px + 1.5vw)",
        color: 'primary.light'
    }

    const withinX = (num1, num2, range) => {
        if (Math.abs(num1 - num2) < range) {
            return true;
        }
        return false;
    }

    const whereAmI = () => {

        let node = ReactDOM.findDOMNode(mainRef.current)
        let yLoc = node.getBoundingClientRect().y
        let windowDim = getWindowDimensions()
        // see if we are close to the bottom of the screen...
        if (withinX(windowDim.height, yLoc, 200)) {
            return true
        }
        return false

    }


    React.useEffect(() => {//Component will mount   

        if (!whereAmI()) {
            setOnScreen(false)
        } else {
            setOnScreen(true)
        }

        let timeout;
        if (showing) {
            timeout = 2000
        } else {
            timeout = 7000
        }

        settimeout(setTimeout(() => {
            setShowing(!showing);
        }, (timeout)))

        return () => {   //Component will unmount
            clearTimeout(timeout)
        }
    }, [showing])


    return (
        <Fade in={showing && onScreen} {...(showing ? { timeout: 2000 } : {})} {...(!showing ? { timeout: 1000 } : {})}>

            <Box ref={mainRef} sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "center",
                alignItems: 'center',
                position: 'absolute',
                bottom: "0px",

            }}>

                <KeyboardDoubleArrowDownIcon sx={fontStyle} /> <Typography sx={fontStyle}>{props.hint}</Typography> <KeyboardDoubleArrowDownIcon sx={fontStyle} />

            </Box>
        </Fade>
    )
}

