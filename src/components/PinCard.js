import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Thumbtacks from "../images/assets/thumbtacks.png";

const bgcolor = {
    green: "#ECFFF4",
    blue: "#ECF5FF",
    yellow: "#FFFAEC",
}

const textcolor = {
    green: "#2A6442",
    blue: "#37669C",
    yellow: "#B59133",

}

const buttoncolor = {
    green: "#56C976",
    blue: "#5692C9",
    yellow: "#F6BC27",
}

const PostField = styled(TextField)(({ colorvariation }) => ({
       '& .MuiOutlinedInput-root': {
         padding: "0px",
         '& textarea': {
           borderRadius: "10px", 
           padding: "15px  15px",
           fontFamily: "Comic Neue",
           borderWidth: "0px",
           backgroundColor: bgcolor[colorvariation],
           color: textcolor[colorvariation],
           borderWidth: "0px",
           fontSize: "18px"
         },
         '& fieldset': {
            padding: "0px",
            borderWidth: "0px",
          },
         '&:hover fieldset': {
            borderWidth: "0px",
         },
         '&.Mui-focused fieldset': {
            borderWidth: "0px",
         },
       },
   }));

const PinCard = ({colorVariation, placeholder, triggerPin}) => {

   const [post, setPinpost] = useState("")

   

   const ButtonStyle = {
       borderRadius: "10px", 
       height: "50px;", 
       marginTop: "10px", 
       fontFamily: "Comic Neue", 
       fontWeight: "700", 
       backgroundColor: buttoncolor[colorVariation],
       boxShadow: "none",
       textTransform: "none",
   }



   const handlePostChange = (value) => {
      setPinpost(value)
   }

   const handlePinOnclick = () => {
      triggerPin(post)
      setPinpost('')
   }
  return (
    <div>
        <PostField value={post} multiline fullWidth onChange={(event) => handlePostChange(event.target.value)} placeholder={placeholder} colorvariation={colorVariation}/>
        <div className='pincard-btn'>
            <Button variant="contained" sx={ButtonStyle} startIcon={<img width={20} height={21} src={Thumbtacks}/>} onClick={handlePinOnclick}>
                Pin
            </Button>
        </div>
    </div>
  )
}

export default PinCard