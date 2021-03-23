import React from 'react'
import Chatbox from './chatbox'
import BoardLauncher from './whiteboardLauncher'
import Timer from './timer'


const Mvp = () => {


  return (
    <div className="drawinggame">
      <Timer />
      <BoardLauncher />
      <Chatbox />
    </div>
  )
}

export default Mvp
