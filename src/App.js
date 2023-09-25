import './App.css';
//import socketIOClient from "socket.io-client";
import {useEffect} from "react"
import Creation from './pages/Creation';
import Home from './pages/Home';
import { useState } from "react"
//const socket = socketIOClient("http://localhost:5000");
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:5000");


function App() {

  const [isRegistered, setRegistered] = useState(false)

  useEffect(() => {
    localStorage.getItem("userProfile") ? setRegistered(true) : setRegistered(false)

  //   return () => {
  //     localStorage.clear()
  //  }
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
        isRegistered ? <Home socket={socket}/> : <Creation socket={socket} triggerUserRegistered={handleUserWasRegistered}/>
      }
    </>
  );
}

export default App;
