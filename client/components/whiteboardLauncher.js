import io from 'socket.io-client'
import React from 'react'
import Board from './whiteboardv1'

const BoardLauncher = (props) => {
  const server = io.connect('/')
  return (
    <div>
      <Board io={server} roomNum={props.roomNum}/>
    </div>
  )
}

export default BoardLauncher
