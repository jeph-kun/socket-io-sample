const express = require('express');
const http = require("http");
const socket  = require("socket.io");
const app = express();
const { v4: uuidv4 } = require('uuid');

const httpServer = http.createServer(app);
const io = new socket.Server(httpServer, {
  cors: {
    origin: "*"
  }
});


let Users = []

let wentWellList = []
let notWentWellList = []
let newIdeasList = []

io.on('connection', function(socket) {

  socket.on('disconnect', function() {
  });

  socket.on('register-user', function(data) {
    let userId = uuidv4()
    Users = [...Users, {...data, userId}]
    socket.emit("recieve-user-id", userId)
  });

  socket.on('fetch-all-list', () => {
    socket.emit("recieve-all-list", {wentWellList, notWentWellList, newIdeasList})
  });

  socket.on('add-went-well', function(data) {

    let postId = uuidv4()

    wentWellList = [
      {
        id: postId,
        userId: data.userId,
        name: data.name,
        thumbnail: data.selectedAvatar,
        post: data.post,
        likes: []
    
      }, ...wentWellList
    ]

    io.emit("update-went-well", {wentWellList});

  });

  socket.on('add-not-went-well', function(data) {

    let postId = uuidv4()

    notWentWellList = [
      {
        id: postId,
        userId: data.userId,
        name: data.name,
        thumbnail: data.selectedAvatar,
        post: data.post,
        likes: []
    
      }, ...notWentWellList
    ]

    io.emit("update-not-went-well", {notWentWellList});

  });

  socket.on('add-new-ideas', function(data) {

    let postId = uuidv4()


    newIdeasList = [
      {
        id: postId,
        userId: data.userId,
        name: data.name,
        thumbnail: data.selectedAvatar,
        post: data.post,
        likes: []
    
      }, ...newIdeasList
    ]

    io.emit("update-new-ideas", {newIdeasList});

  });

  socket.on('handle-like-post', function(data) {

    const allPosts = [...wentWellList, ...notWentWellList, ...newIdeasList]

    //FIND SPECIFIC POST
    let postData = allPosts.find((post) => post.id === data.postId)

    if(postData){

      //CHECK IF ALREADY LIKED
      if(postData.likes.includes(data.userId)){
        postData.likes = postData.likes.filter((userId) => userId !== data.userId)
      } else {
        postData.likes = [...postData.likes, data.userId]

      }

      //SENT TO FRONTEND
      const updatePosts = {
        'went-well': io.emit("update-went-well", {wentWellList}),
        'not-well': io.emit("update-not-went-well", {notWentWellList}),
        'new-ideas': io.emit("update-new-ideas", {newIdeasList}),
      }
  
      updatePosts[data.type]

    }



  });

  socket.on('delete-post', function(data) {


    switch (data.type) {
      case 'went-well': {
        wentWellList = wentWellList.filter((postInfo) => postInfo.id !== data.postId)
        io.emit("update-went-well", { wentWellList })
      } 
      break;
      case 'not-well': {
        notWentWellList = notWentWellList.filter((postInfo) => postInfo.id !== data.postId)
        io.emit("update-not-went-well", { notWentWellList })
      } 
      break;
      case 'new-ideas': {
        newIdeasList = newIdeasList.filter((postInfo) => postInfo.id !== data.postId)
        io.emit("update-new-ideas", { newIdeasList })
      } 
      break;
      }


      // const updatePosts = {
      //   'went-well': io.emit("update-went-well", { wentWellList: wentWellList.filter((postInfo) => postInfo.id !== data.postId) }),
      //   'not-well': io.emit("update-not-went-well", { notWentWellList: notWentWellList.filter((postInfo) => postInfo.id !== data.postId)}),
      //   'new-ideas': io.emit("update-new-ideas", { newIdeasList: newIdeasList.filter((postInfo) => postInfo.id !== data.postId)}),
      // }
      // updatePosts[data.type]


  });

});

httpServer.listen(5000, function() {
  console.log('listening on *:5000');
});