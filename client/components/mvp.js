import React from 'react'
import Chatbox from './chatbox'
import Board from './whiteboard'
import socket from '../socket'
import BoardLauncher from './whiteboardLauncher'
import Timer from './timer'
import Scoreboard from './scoreboard'
import CreateUser from './createUser';





const Mvp = (props) => {
  const roomNum = props.match.params.id
  console.log('socket.rooms)',socket.rooms)
  console.log('connected',roomNum)
  socket.emit('Join Room', roomNum);
  return (
    <div className="drawinggame">
      <h1>Room code:{roomNum}</h1>
      <CreateUser roomNum={roomNum} />
      <Board roomNum={roomNum}/>
      {/* <Chatbox roomNum={roomNum}/> */}
      <Scoreboard roomNum={roomNum} />
      <Timer roomNum={roomNum}/>
    </div>
  )
}

export default Mvp
