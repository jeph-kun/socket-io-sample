import React from 'react'
import PinCard from '../components/PinCard'
import PostCard from '../components/PostCard'

let allPosts = {
    wentWell: [
        {
           id: "abcd1234",
           userId: "dwajklsdjo",
           name: 'Jane Doe',
           thumbnail: 'cat',
           post: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
           likes: ["12121", "190901", "e2813e03-b4c8-4d72-bb72-33a2bfec7964"]
        }
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
const Home = () => {


  const handlePin = (post, type) => {
      console.log(type + ": " + post)
  }

  const handleLikePost = (postId, userId) => {
      console.log(postId + ": " + userId)
  }

  const handleDeletePost = (postId) => {
    console.log(postId)
  }


  return (
    <div className="home">
        <div>
        </div>

        <div className="retro-containers">
            <div className='retro-items'>
                <h3 className='color-green'>Went Well</h3>
                <PinCard colorVariation="green" triggerPin={(post) => handlePin(post, "went-well")} placeholder="What went well for you this sprint?"/>
                {
                    allPosts.wentWell.map((post) => 
                        <PostCard 
                            key={post.id} 
                            postData={post} 
                            colorVariation="green" 
                            triggerLikePost={(postId, userId) => handleLikePost(postId, userId)} 
                            triggerDeletePost={(postId) => handleDeletePost(postId)}
                        />
                    )
                }
            </div>
            <div className='retro-items'>
                <h3 className='color-blue'>Not so Well</h3>
                <PinCard colorVariation="blue" triggerPin={(post) => handlePin(post, "not-well")} placeholder="What do you think did not turn up well?"/>
                {
                    allPosts.notWell.map((post) => 
                        <PostCard 
                            key={post.id} 
                            postData={post} 
                            colorVariation="blue" 
                            triggerLikePost={(postId, userId) => handleLikePost(postId, userId)} 
                            triggerDeletePost={(postId) => handleDeletePost(postId)}
                        />
                    )
                }
            </div>
            <div className='retro-items'>
                <h3 className='color-yellow'>New Ideas</h3>
                <PinCard colorVariation="yellow" triggerPin={(post) => handlePin(post, "new-ideas")} placeholder="Do you have some ideas to share?"/>
                {
                    allPosts.newIdeas.map((post) => 
                        <PostCard 
                            key={post.id} 
                            postData={post} 
                            colorVariation="yellow"
                            triggerLikePost={(postId, userId) => handleLikePost(postId, userId)} 
                            triggerDeletePost={(postId) => handleDeletePost(postId)}
                        />
                    )
                }
            </div>
        </div>

    </div>
  )
}

export default Home