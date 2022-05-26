import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Box } from "@mui/material";



const box_style = {
    backgroundColor: "black",
    minWidth: '400px',
    minHeight: '400px',
    position: 'relative'
}



function getTime() {
    const d = new Date();
    let time = d.getTime();
    return time
}


export default function Pong() {

    const courtRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const botRef = React.useRef(null);
    const [direction, setDirection] = React.useState('up')
    let last_time =React.useRef(getTime());
    const [playerY, setPlayerY] = React.useState(0)
    



    // Timeout ref to keep track of last called timeout. Clear this when the component is unmounted
    const [timeout, settimeout] = React.useState(null)


    React.useEffect(() => {//Component will mount   
        settimeout(setTimeout(() => { console.log('got start hook'); move(true); }, (100)))

        return () => {   //Component will unmount
    
            clearTimeout(timeout)
        }
    }, [])

    React.useEffect(() => {//Component will mount   
        settimeout(setTimeout(() => { move() }, 15))
    }, [playerY]) 
    
    React.useEffect(() => {//Component will mount   
        if (timeout === null){
        settimeout(setTimeout(() => { move(true) }, 15))
        }
    }, [direction])

    // Thos gets called from useEffect. As en effect it will trigger useEffect as reacts convenance; triggering another move, continue. Stopped when unmounted.
    const move = (resting) => {

        let node = ReactDOM.findDOMNode(courtRef.current)
        let courtBox = node.getBoundingClientRect()
        // get player location
        node = ReactDOM.findDOMNode(playerRef.current)
        let playerBox = node.getBoundingClientRect()

        let yDiff = courtBox.y - playerBox.y
        // Check off bottom
        if ((yDiff - playerBox.height < -courtBox.height) && direction === 'down') {
            settimeout(null)
            return
        }
        // Check at top
        if (yDiff > 0 && direction === 'up') {
            settimeout(null)
            return
        }
        
        let time = getTime()
        let diff = time - last_time.current
        last_time.current = time
        if (resting === true){
            diff = 1;
        }
        

        if (direction === 'up') {
            setPlayerY(playerY - (0.25 * diff))
        }
        else {
            setPlayerY(playerY + (0.25 * diff))
        }
    }


    const catchMouseMove = (e) => {
        e.preventDefault()
        let node = ReactDOM.findDOMNode(playerRef.current)
        let yDiff = node.getBoundingClientRect().y - e.clientY
        let direction;
        if (yDiff > 0) {
            direction = "up";
        } else {
            direction = "down";
        }
        setDirection(direction)
    }

    return (

        <Box ref={courtRef} sx={box_style} onMouseMove={catchMouseMove}>

            <Paddle key="eggs" paddleRef={playerRef} top={playerY} />    
            <Ball left='10%' />
        </Box>
    )
}

// /<Paddle left='95%' paddleRef={botRef} top={100} />

class Paddle extends React.Component {


    constructor(props) {
        super(props)
        this.state = {

        }

    }


    render() {
        return (

            <Box sx={{
                backgroundColor: "white",
                position: 'absolute',
                top: `${this.props.top}px`,
                left: this.props.left,
                width: '5%',
                height: '15%'
            }} ref={this.props.paddleRef}>


            </Box>
        )
    }



}

class Ball extends React.Component {


    constructor(props) {
        super(props)
        this.state = {

        }

    }

    render() {
        return (

            <Box sx={{
                borderRadius: '50%',
                backgroundColor: "white",
                position: 'absolute',
                top: '10px',
                left: this.props.left,
                width: '5%',
                height: '5%'
            }} ref={this.props.paddleRef}>


            </Box>
        )
    }



}


/*
export default function Pong() {

    const playerRef = React.useRef(null);
    const botRef = React.useRef(null);
    const [direction, setDirection] = React.useState('down')

    const [playerY, setPlayerY] = React.useState(100)




    // Timeout ref to keep track of last called timeout. Clear this when the component is unmounted
    let timeout = React.useRef(null);


    React.useEffect(() => {//Component will mount   
        timeout.current = setTimeout(()=>{console.log('got start hook');move();}, (1))
        return () =>{   //Component will unmount
            console.log('got end hook')
            clearTimeout(timeout)
        }
    },[])


    const move = (e) => {
        
        if (direction==='up'){
            console.log('movingUp')
            setPlayerY(playerY+100)
        }
        //playerRef.current
        timeout = setTimeout(()=>{move()}, 100)     
    }
 


    const catchMouseMove = (e) => {
        e.preventDefault()
        //console.log(nameRef.current)
        let node = ReactDOM.findDOMNode(playerRef.current)
        let yDiff = node.getBoundingClientRect().y - e.clientY
        let direction;
        if (yDiff > 0) {
            direction = "up";
        } else {
            direction = "down";
        }
        setDirection(direction)
        console.log(direction)
    }

    return (

        <Box sx={box_style} onMouseMove={catchMouseMove}>
            {timeout.current}
            <Paddle key="eggs" ref={timeout} paddleRef={playerRef} top={playerY}/>    <Paddle left='95%' paddleRef={botRef} />
            <Ball left='10%'/>
        </Box>
    )
}

*/