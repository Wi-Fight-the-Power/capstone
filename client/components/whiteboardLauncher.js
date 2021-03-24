import React from 'react'
import Board from './whiteboard'


const BoardLauncher = () => {
  return (
    <div>
      <Board roomNum={props.roomNum}/>
    </div>
  )
}

export default BoardLauncher
