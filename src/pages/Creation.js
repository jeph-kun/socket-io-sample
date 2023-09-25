import React from 'react'
import CreateUserCard from '../components/CreateUserCard';



const Creation = ({triggerUserRegistered, socket}) => {
  return (
    <>
        <div className="creation-card">
           <div className='cloud'/>
           <CreateUserCard triggerUserRegistered={triggerUserRegistered} socket={socket}/>
        </div>
    </>
  )
}

export default Creation