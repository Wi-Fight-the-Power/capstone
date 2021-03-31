import React, {useRef} from 'react'
// import { render } from "react-dom";
import {Stage, Layer, Line, Text} from 'react-konva'
import socket from '../socket'
import {Button} from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const Board = props => {
  const [stroke, changeStroke] = React.useState(12)
  const [color, changeColor] = React.useState('#FFAEBC')
  const [tool, setTool] = React.useState('pen')
  const [lines, setLines] = React.useState([])


  const isDrawing = React.useRef(false)

  const handleMouseDown = e => {
    isDrawing.current = true
    const pos = e.target.getStage().getPointerPosition()
    setLines([...lines, {tool, stroke, color, points: [pos.x, pos.y]}])
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



    // replace last
    lines.splice(lines.length - 1, 1, lastLine)
    socket.emit('drawing', lines.concat(),props.roomNum)
    setLines(lines.concat())
  }


  socket.on('drawing', drawn => setLines(drawn))


  const handleMouseUp = () => {
    isDrawing.current = false
  }

  const undoLast = () => {
    lines.pop()
    socket.emit('drawing', lines.concat(),props.roomNum)
    setLines(lines.concat())

  }

  return (
    <div>
        <Button color='primary' variant='contained' onClick={() => undoLast()}>UNDO</Button>
        {/* stroke size */}
        <input type="range" min='1' max='25'  className='strokeScale drawTools' onChange={e => changeStroke(e.target.value)}/>

        {/* change colors */}
        <Select
        className="drawTools"
        value={color}
        onChange={e => changeColor(e.target.value)}>
        <MenuItem value="#FFAEBC">Hot Pink</MenuItem>
        <MenuItem value="#A0E7E5">Tiffany Blue</MenuItem>
        <MenuItem value="#B4F8C8">Mint</MenuItem>
        <MenuItem value="#FBE7C6">Yellow</MenuItem>
      </Select>
      {/* tool selection */}
      <Select
        className="drawTools"
        value={tool}
        onChange={e => {
          setTool(e.target.value)
        }}
      >
        <MenuItem value="pen">Pen</MenuItem>
        <MenuItem value="eraser">Eraser</MenuItem>
        {/* <option value="fill">Fill</option> */}
      </Select>
      <Stage
        width={500}
        height={500}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
          style={{  backgroundColor: 'pink'}}
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

export default Board
