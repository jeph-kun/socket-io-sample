import React from 'react'
import CreateUserCard from '../components/CreateUserCard';



const Creation = ({triggerUserRegistered}) => {
  return (
    <>
        <div className="creation-card">
           <div className='cloud'/>
           <CreateUserCard triggerUserRegistered={triggerUserRegistered}/>
        </div>
    </>
  )
}

export default Creation