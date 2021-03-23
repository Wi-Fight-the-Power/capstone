import React, {useRef} from 'react'
// import { render } from "react-dom";
import {Stage, Layer, Line, Text} from 'react-konva'

const Board = props => {
  const [stroke, changeStroke] = React.useState(50)
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
    props.io.emit('drawing', lines.concat())
    setLines(lines.concat())
  }

  props.io.on('drawing', drawn => setLines(drawn))


  const handleMouseUp = () => {
    isDrawing.current = false
  }

  return (
    <div>
        <input type="range" min='1' max='100'  className='strokeScale drawTools' onChange={e => changeStroke(e.target.value)}/>

        <select
        className="drawTools"
        value={color}
        onChange={e => changeColor(e.target.value)}
      >
        <option className="HotPink colorOptions" value="#FFAEBC">Hot Pink</option>
        <option className="TiffanyBlue colorOptions" value="#A0E7E5">Tiffany Blue</option>
        <option className="Mint colorOptions" value="#B4F8C8">Mint</option>
        <option className="Yellow colorOptions" value="#FBE7C6">Yellow</option>
      </select>

      <select
        className="drawTools"
        value={tool}
        onChange={e => {
          setTool(e.target.value)
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
        {/* <option value="fill">Fill</option> */}
      </select>
      <Stage
        width={500}
        height={500}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={line.stroke}
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
