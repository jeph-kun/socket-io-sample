import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useState} from "react"
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import birds from "../images/assets/love-birds.png"




const avatars = ['cat', 'dog', 'puffer-fish', 'rabbit']


const NameField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: "10px", borderWidth: "2px", fontFamily: "Comic Neue", borderColor: "#1fb7f8",
      },
      '&:hover fieldset': {
        borderRadius: "10px", borderWidth: "2px", borderColor: "#1fb7f8"
      },
      '&.Mui-focused fieldset': {
        borderRadius: "10px", borderWidth: "3px", fontFamily: "Comic Neue", borderColor: "#1fb7f8"
      },
    },
  });

const ButtonStyle = {
  borderRadius: "10px", height: "50px;", marginTop: "20px", fontFamily: "Comic Neue", fontWeight: "700", backgroundColor: "#3A84EF"
}
  


const CreateUserCard = ({triggerUserRegistered, socket}) => {
  
  const [selectedAvatar, setSelectedAvatar] = useState("")
  const [name, setName] = useState("")


  const handleContinue = () => {
    socket.emit("register-user", {name, selectedAvatar})
    socket.on('recieve-user-id', function(userId) {
      localStorage.setItem("userProfile", JSON.stringify({name, selectedAvatar, userId}))
      triggerUserRegistered()
    });
  }

  return (
    <>

    <Box sx={{ width: 400, position: "relative" }}>
        <img src={birds} className="love-birds"/>
        <Card variant="outlined" sx={{ borderRadius: "10px", borderWidth: "2px", borderColor: "#1fb7f8"}}>
            <CardContent>
                <Typography sx={{ fontWeight: "700", color: "#1fa1f8", fontFamily: "Itim" }}  variant='h5' align='center' gutterBottom>
                    Choose your avatar
                </Typography>
                
                <div className="avatar-list">
                    {
                        avatars.map(avatar => <img key={avatar} className={selectedAvatar === avatar ? "selected-avatar" : ""} src={`/images/avatars/${avatar}.png`} onClick={() => setSelectedAvatar(avatar)}></img>)
                    }
                </div>

                <NameField fullWidth placeholder='Enter your name' onChange={(event) => setName(event.target.value)}/>
                <Button disabled={selectedAvatar === "" ? true : name === "" ? true : false} sx={ButtonStyle} variant="contained" size="large" fullWidth onClick={handleContinue}>Continue</Button>
            </CardContent>      
        </Card>
    </Box>
    </>
  )
}

export default CreateUserCard