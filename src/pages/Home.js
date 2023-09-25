import React, { useState, useEffect } from 'react'
import PinCard from '../components/PinCard'
import PostCard from '../components/PostCard'
import HappyImg from '../images/assets/happy.png'
import SadImg from '../images/assets/sad.png'
import LightImg from '../images/assets/light-bulb.png'




let allPosts = {
    wentWell: [

    ],
    notWell: [
        {
           id: "abcdasws4",
           userId: "e2813e03-b4c8-4d72-bb72-33a2bfec7964",
           name: 'Jane Doe',
           thumbnail: 'cat',
           post: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
           likes: ["12121", "190901",]
        }
    ],
    newIdeas: [
        {
            id: "abcvcx34",
            userId: "dhiowahd",
            name: 'Jane Doe',
            thumbnail: 'cat',
            post: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
            likes: ["12121", "190901", "e2813e03-b4c8-4d72-bb72-33a2bfec7964"]
        }
    ]
}
const Home = ({socket}) => {




  const [wentWell, setWentWell] = useState([])
  const [notWentWell, setNotWentWell] = useState([])
  const [newIdeas, setNewIdeas] = useState([])

  useEffect(() => {

    fetchAllList()
    socket.on('update-went-well', (data) => {
        setWentWell(data.wentWellList)     
    });
    socket.on('update-not-went-well', (data) => {
        setNotWentWell(data.notWentWellList)     
    });
    socket.on('update-new-ideas', (data) => {
        setNewIdeas(data.newIdeasList)     
    });
  }, [])
  



  
  const fetchAllList = () => {
    socket.emit('fetch-all-list')
    socket.on('recieve-all-list', (data) => {
        console.log('test')
        setWentWell(data.wentWellList)
        setNotWentWell(data.notWentWellList)    
        setNewIdeas(data.newIdeasList) 
    })
  }

  const handlePin = (post, type) => {

      const { name, selectedAvatar, userId } = JSON.parse(localStorage.getItem('userProfile'))

      switch (type) {
        case 'went-well': {
            socket.emit("add-went-well", {post, name, selectedAvatar, userId})
        } 
        break;
        case 'not-well': {
            socket.emit("add-not-went-well", {post, name, selectedAvatar, userId})
        } 
        break;
        case 'new-ideas': {
            socket.emit("add-new-ideas", {post, name, selectedAvatar, userId})
        } 
        break;
      }
  }

  const handleLikePost = (postId, userId, type) => {
      console.log(postId + ": " + userId)

      socket.emit("handle-like-post", {postId, userId, type})

  }

  const handleDeletePost = (postId, type) => {
    console.log(postId)

    socket.emit("delete-post", {postId, type})

  }


  return (
    <div className="home">
        <div>
        </div>

        <div className="retro-containers">
            <div className='retro-items'>
                <img className="happy-img" src={HappyImg}/>
                <h3 className='color-green'>Went Well</h3>
                <PinCard colorVariation="green" triggerPin={(post) => handlePin(post, "went-well")} placeholder="What went well for you this sprint?"/>
                {
                    wentWell.map((post) => 
                        <PostCard 
                            key={post.id} 
                            postData={post} 
                            colorVariation="green" 
                            triggerLikePost={(postId, userId) => handleLikePost(postId, userId, 'went-well')} 
                            triggerDeletePost={(postId) => handleDeletePost(postId, 'went-well')}
                        />
                    )
                }
            </div>
            <div className='retro-items'>
                <img className="sad-img" src={SadImg}/>
                <h3 className='color-blue'>Not so Well</h3>
                <PinCard colorVariation="blue" triggerPin={(post) => handlePin(post, "not-well")} placeholder="What do you think did not turn up well?"/>
                {
                    notWentWell.map((post) => 
                        <PostCard 
                            key={post.id} 
                            postData={post} 
                            colorVariation="blue" 
                            triggerLikePost={(postId, userId) => handleLikePost(postId, userId, 'not-well')} 
                            triggerDeletePost={(postId) => handleDeletePost(postId, 'not-well')}
                        />
                    )
                }
            </div>
            <div className='retro-items'>
                <img className="light-img" src={LightImg}/>
                <h3 className='color-yellow'>New Ideas</h3>
                <PinCard colorVariation="yellow" triggerPin={(post) => handlePin(post, "new-ideas")} placeholder="Do you have some ideas to share?"/>
                {
                    newIdeas.map((post) => 
                        <PostCard 
                            key={post.id} 
                            postData={post} 
                            colorVariation="yellow"
                            triggerLikePost={(postId, userId) => handleLikePost(postId, userId, 'new-ideas')} 
                            triggerDeletePost={(postId) => handleDeletePost(postId, 'new-ideas')}
                        />
                    )
                }
            </div>
        </div>

    </div>
  )
}

export default Home