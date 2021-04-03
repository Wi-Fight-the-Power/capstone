import React, {useRef} from 'react'
// import { render } from "react-dom";
import {Stage, Layer, Line, Text} from 'react-konva'

import socket from '../socket'


const ViewBoard = () => {
  const [lines, setLines] = React.useState([])
  const [background, setBackground] = React.useState('white')


socket.on('drawing', drawn => setLines(drawn))

 socket.on('boardColor', bgcolor => {
  setBackground(bgcolor)
})

  return (
    <div>
      <Stage
        width={500}
        height={500}
        style={{  backgroundColor: background}}
        >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={line.stroke}
              tension={0}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default ViewBoard
