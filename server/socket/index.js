module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)


     //creates the room
    socket.on('Join Room', room => {
      socket.join(room)
      //for listing the lobby
      socket.emit('roomNum',room)
    })
    //user joined
    socket.on('userJoined', room => {
      socket.to(room).emit('userJoined', room);
    })
    //attaching player handle to socket id
    socket.on('userToSocket', (name, room) => {
      socket.username = name;
      socket.room = room;

    })
    //sending user info
    socket.on('sendingUserInfo', (info, room) => {
      // All player SocketIDs
      const roominfo = io.sockets.adapter.rooms[room].sockets
      // all players array
      const playerArr = Object.keys(roominfo)
      const newUser = playerArr[playerArr.length - 1];
      io.to(newUser).emit('recievingUserInfo', info)

    })
    //leaving a room
     socket.on('leaveRoom', room => {

      socket.leave(room)

      const roominfo = io.sockets.adapter.rooms[room] || []

      //checking room size
      if(roominfo.length <= 0){
        //delete room with 0 players
         delete io.sockets.adapter.rooms[room];
      }

    })
    //background color change
    socket.on('boardColor', (bgcolor, room) => {
      socket.to(room).emit('boardColor', bgcolor)
    })

    //checks to see if room exist or not
    socket.on('exist', room => {
      const roominfo = io.sockets.adapter.rooms[room] || []
      if(roominfo.length > 0){
        socket.emit('exist',true)
      }
      else {
        socket.emit('exist',false)
        }
      })
    //sends message data to room
    socket.on('message', (message, room ) => {
      socket.to(room).emit("message", message)
    })
    //sends user data to room
    socket.on('user', (user, room) => {
      socket.to(room).emit('user', user)
    })
    //update order
     socket.on('order', (order, room ) => {
      socket.to(room).emit("order", order)
    })
    //sends word to users
   socket.on('word', (word, room) => {
     socket.to(room).emit('word', word)
   })
   //sends drawer to users
   socket.on('drawer', (drawer, room) => {
     socket.to(room).emit('drawer', drawer)
   })
   //sends answer status to user/room
   socket.on('answered',(answer, room) => {
     socket.to(room).emit('answered', answer)
   })
    //sends drawing data to room
    socket.on('drawing', (data, room) => {
      socket.to(room).emit("drawing", data)
    })
    //disconnect
    socket.on('score', (score, room) => {
      socket.to(room).emit('score', score)
    })
    //timer
    socket.on('countdown', (time,room) => {
    socket.to(room).emit("timer",time)
  });
    //room length
    socket.on('getRoomLength', room => {
      // All player SocketIDs
      const roominfo = io.sockets.adapter.rooms[room].length

      if(roominfo < 2){
        io.to(socket.id).emit('getRoomLength', true)
      } else {
        io.to(socket.id).emit('getRoomLength', false)
      }
    })
    //rotation
    socket.on('rotation', (curRot, room) => {
      let newRot =  curRot
      // All player SocketIDs
      const roominfo = io.sockets.adapter.rooms[room].sockets
      // all players array
      const playerArr = Object.keys(roominfo)
      socket.to(room).emit('users', playerArr, room);
      if(newRot > playerArr.length -1){
        newRot = 0;
      }
      let drawer = playerArr[newRot]

      //let drawerHandle = io.sockets.connected[drawer].username
      //heads up, drawer handle was removed from rotations

      let viewers = playerArr.filter(player => player !== drawer)
      io.to(drawer).emit('rotate', true, newRot);
      viewers.forEach(player => {
      io.to(player).emit('rotate',
      false, newRot);

    })
    })
    //disconnect
    socket.on('disconnect', () => {
      io.to(socket.room).emit('playerHasLeft', socket.username)
      console.log(`This guyyyy ${socket.id}.. is gone..`)
    })
  })
}



