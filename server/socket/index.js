module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

     //creates the room
    socket.on('Join Room', room => {
      socket.join(room)
    })

    //user joined

    socket.on('userJoined', room => {
      socket.to(room).emit('userJoined');
    })

    //sending user info

    socket.on('sendingUserInfo', (info, room) => {
      // All player SocketIDs
      const roominfo = io.sockets.adapter.rooms[room].sockets
      // all players array
      const playerArr = Object.keys(roominfo)
      const newUser = playerArr[playerArr.length - 1];
      socket.to(newUser).emit('recievingUserInfo', info)
    })

    //leave the room
    socket.on('Leave Room', room => {
      socket.leave(room)

      const roominfo = io.sockets.adapter.rooms[room] || []

      //checking room size
      if(roominfo.length <= 0){
        //delete room with 0 players
         delete io.sockets.adapter.rooms[room];
      }

    })

    //checks to see if room exist or not
    socket.on('exist', room => {
      const roominfo = io.sockets.adapter.rooms[room] || []
      if(roominfo.length > 0){
        console.log(roominfo)
        socket.emit('exist',true)
      }
      else {
        socket.emit('exist',false)
        console.log("room doesnt exist")}
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
    //rotation
    socket.on('rotation', (room) => {
      const roominfo = io.sockets.adapter.rooms[room].sockets

      // All player SocketIDs
      const playerArr = Object.keys(roominfo)
      socket.to(room).emit('users', playerArr, room);

      // All player ( not including drawer )
      const withoutDrawerArr = playerArr.filter(IDs => IDs !== socket.id)

      // change drawer to viewer
      io.to(socket.id).emit('rotation', true)

      // change viewer to drawer
      const viewerIndx = [Math.floor(Math.random() * withoutDrawerArr.length)]
      socket.to(withoutDrawerArr[viewerIndx]).emit('rotation', false)
    })

    //disconnect
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
