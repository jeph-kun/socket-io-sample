import './App.css';
import socketIOClient from "socket.io-client";
import {useEffect} from "react"
import Creation from './pages/Creation';
import Home from './pages/Home';
import { useState } from "react"
//const socket = socketIOClient("http://localhost:5000");


function App() {

  const [isRegistered, setRegistered] = useState(false)

  useEffect(() => {
    localStorage.getItem("userProfile") ? setRegistered(true) : setRegistered(false)
  }, [])

  // const handleClick = () => {
  //   socket.emit("custom-event")
  // }
  


  const handleUserWasRegistered = () => {
     setRegistered(true)
  }

  return (
    <>
      {
        isRegistered ? <Home/> : <Creation triggerUserRegistered={handleUserWasRegistered}/>
      }
    </>
  );
}

export default App;
