module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // socket.on('message', (message, roomnum) => {
    //   socket.broadcast.emit('message', message, roomnum)
    //   console.log(roomnum)
    // })

    // socket.on('drawing', (data,room) => {console.log(room)})

    // socket.on('Join Room', room => {socket.join(room)})

    // socket.on('message', ({room , message}) => {
    //   socket.to(room).emit("message", message)
    // })

    // socket.on('drawing', ({room , data}) => {
    //   socket.to(room).emit("data", data)
    // })

        socket.on('Join Room', room => {socket.join(room)})

    socket.on('message', (message, room ) => {
      socket.to(room).emit("message", message)
    })

    socket.on('drawing', (data, room) => {
      socket.to(room).emit("drawing", data)
    })


    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
