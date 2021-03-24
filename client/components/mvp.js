import React from 'react'
import Chatbox from './chatbox'
import Board from './whiteboardv1'
import socket from '../socket'


const Mvp = (props) => {
  const roomNum = props.location.state.room
  console.log('socket.rooms)',socket.rooms)
  console.log('connected',roomNum)
  socket.emit('Join Room', roomNum);
  return (
    <div className="drawinggame">
      <Board roomNum={roomNum}/>
      <Chatbox roomNum={roomNum}/>
    </div>
  )
}

export default Mvp
