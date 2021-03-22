import io from 'socket.io-client'
import React, {useRef} from 'react'
import Board from './whiteboardv1'

const BoardLauncher = () => {
  // const socketRef = useRef();
  const server = io.connect('/')
  return (
    <div>
      <Board io={server} />
    </div>
  )
}

export default BoardLauncher
