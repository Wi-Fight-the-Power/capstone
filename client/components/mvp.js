import React from 'react'
import Chatbox from './chatbox'
import BoardLauncher from './whiteboardLauncher'
const Mvp = () => {
  return (
    <div className="drawinggame">
      <BoardLauncher />
      <Chatbox />
    </div>
  )
}

export default Mvp
