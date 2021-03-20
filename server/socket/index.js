module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('message', message => {
      socket.broadcast.emit('message', message)
    })

    socket.on('drawing', data => socket.broadcast.emit('drawing', data))

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
