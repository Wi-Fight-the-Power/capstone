import React from 'react'
import Chatbox from './chatbox'
import Board from './whiteboardv1'
import socket from '../socket'


const Mvp = (props) => {
  const roomNum = props.match.params.id
  console.log('socket.rooms)',socket.rooms)
  console.log('connected',roomNum)
  socket.emit('Join Room', roomNum);
  return (
    <div className="drawinggame">
      <h1>Room code:{roomNum}</h1>
      <Board roomNum={roomNum}/>
      <Chatbox roomNum={roomNum}/>
    </div>
  )
}

export default Mvp
