import React, {useRef} from 'react'
// import { render } from "react-dom";
import {Stage, Layer, Line, Text} from 'react-konva'

import socket from '../socket'


const ViewBoard = props => {
  const [lines, setLines] = React.useState([])




  socket.on('drawing', drawn => setLines(drawn))



  return (
    <div>
      <Stage
        width={500}
        height={500}
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
