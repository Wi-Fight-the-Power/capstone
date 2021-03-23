import React from 'react'
import Board from './whiteboardv1'


const BoardLauncher = () => {
  return (
    <div>
      <Board roomNum={props.roomNum}/>
    </div>
  )
}

export default BoardLauncher
