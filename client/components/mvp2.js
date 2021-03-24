import React from 'react'
import Chatbox from './chatbox'
// import BoardLauncher from './whiteboardLauncher'
import Board from './whiteboard'
import socket from '../socket'
// import {joinRoom} from '../socket'


const Mvp = () => {
  // io.connect('/')
  const roomNum = 54321
  socket.emit('Join Room', roomNum);
  return (
    <div className="drawinggame">
      {/* <button type="submit" onClick={()=>joinRoom}>Room1</button>
      <button type="submit" onClick={()=>io.emit('Join Room', "room2")}>Room2</button> */}
      <Board roomNum={roomNum}/>
      <Chatbox roomNum={roomNum}/>
    </div>
  )
}

export default Mvp
