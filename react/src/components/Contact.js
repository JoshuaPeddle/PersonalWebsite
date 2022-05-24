import * as React from 'react';
import { TextField, Box, Button, Typography } from "@mui/material";


import SendIcon from '@mui/icons-material/Send';






export default function Contact() {

    const nameRef = React.useRef(null);
    const emailRef = React.useRef(null);
    const phoneRef = React.useRef(null);
    const messageRef = React.useRef(null);



    const sendMessage= async (name, email, phone, message)=> {

        let toSend = {name:name, email:email, phone:phone, message:message}

        let response = await fetch('/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(toSend)
        });


    }

    const compileMessage = ()=>{
        let name = getName()
        let email = getEmail()
        let phone = getPhone()
        let message = getMessage()

        sendMessage(name, email, phone, message)
    }

    const getName = (e) => {
        // Get full name field
        return nameRef.current.value
    }
    const getEmail = (e) => {
        return emailRef.current.value
    }
    const getPhone = (e) => {
        return phoneRef.current.value

    }
    const getMessage = (e) => {
        return messageRef.current.value
    }

    return (

        <Box sx={{
            input: { color: 'primary.main', fontSize: 22 },
            label: { color: 'secondary.light', fontSize: 18 },
            textarea: { color: 'primary.main', fontSize: 20 },
            width: '95%', maxWidth: '1500px',
        }}>
            <Typography style={{ caretColor: 'transparent' }} variant="h2" component="h2" color={'primary'}> Contact</Typography>
            <br />
            <TextField id="filled-basic1"  inputRef={nameRef} label="Full Name" variant="outlined" color={'secondary'} sx={{ width: "33%", minWidth: '300px', background: "#00000030" }} />
            <TextField id="filled-basic2" inputRef={emailRef}  autoComplete="email" label="Email" variant="outlined" color={'secondary'} sx={{ width: "33%", minWidth: '300px', background: "#00000030" }} />
            <TextField id="filled-basic3" inputRef={phoneRef}  label="Phone" variant="outlined" color={'secondary'} sx={{ width: "33%", minWidth: '300px', background: "#00000030" }} />
            <div style={{ width: "100%", minHeight: "10px" }}></div>
            <TextField id="filled-basic4" inputRef={messageRef}   size="large" sx={{ background: "#00000030", textarea: { fontSize: 22, } }} label="Message" variant="outlined" rows={15} color={'secondary'} multiline fullWidth />
            <br />
            <Button sx={{ borderColor: 'secondary.main' }} onClick={compileMessage} variant="outlined"><SendIcon sx={{ color: 'secondary.main' }} /></Button>
        </Box>
    )
}
