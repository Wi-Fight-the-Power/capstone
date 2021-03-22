import React, {useRef} from 'react'
// import { render } from "react-dom";
import {Stage, Layer, Line, Text} from 'react-konva'

const Board = props => {
  const [tool, setTool] = React.useState('pen')
  const [lines, setLines] = React.useState([])
  // const socketRef = useRef();

  const isDrawing = React.useRef(false)

  const handleMouseDown = e => {
    isDrawing.current = true
    const pos = e.target.getStage().getPointerPosition()
    setLines([...lines, {tool, points: [pos.x, pos.y]}])
  }

  const handleMouseMove = e => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()
    let lastLine = lines[lines.length - 1]
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y])

    // socketRef.current.emit('drawing', 'Data')

    // replace last
    lines.splice(lines.length - 1, 1, lastLine)
    props.io.emit('drawing', lines.concat())
    setLines(lines.concat())
  }

  props.io.on('drawing', drawn => setLines(drawn))
  // const testSocket = (data) => {
  //   console.log(data)
  // }

  // socketRef.current.on('drawing', testSocket)

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  return (
    <div>
      <select
        style={{position: 'absolute', top: '5px', left: '5px'}}
        value={tool}
        onChange={e => {
          setTool(e.target.value)
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <Stage
        width={500}
        height={500}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
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

export default Board
