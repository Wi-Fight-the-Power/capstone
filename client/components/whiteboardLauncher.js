import io from 'socket.io-client'
import React from 'react'
import Board from './whiteboard'

const BoardLauncher = () => {
  const server = io.connect('/')
  return (
    <div>
      <Board io={server}/>
    </div>
  )
}

export default BoardLauncher
