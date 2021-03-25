module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
     //creates the room
    socket.on('Join Room', room => {socket.join(room)})
    //checks to see if room exist or not
    socket.on('exist', (room ) => {
      const roominfo = io.sockets.adapter.rooms[room] || []
      // console.log(roominfo)
      if(roominfo.length > 0){socket.emit('exist',true)}
      else {
        socket.emit('exist',false)
        console.log("room doesnt exist")}
        })
    //sends message data to room
    socket.on('message', (message, room ) => {
      socket.to(room).emit("message", message)
    })
    //sends drawing data to room
    socket.on('drawing', (data, room) => {
      socket.to(room).emit("drawing", data)
    })
    //score
    socket.on('score', score => {
      socket.broadcast.emit('score', score)
    })
    //timer
    socket.on('countdown', (time,room) => {
    socket.to(room).emit("timer",time)
  });
    //disconnect
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
