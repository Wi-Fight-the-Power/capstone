import React from 'react'
// import { render } from "react-dom";
import {Stage, Layer, Line, Text} from 'react-konva'
import socket from '../socket'
import {Button} from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles';

const Board = props => {
  const [stroke, changeStroke] = React.useState(12)
  const [color, changeColor] = React.useState('white')
  const [tool, setTool] = React.useState('pen')
  const [lines, setLines] = React.useState([])
  const [background, setBackground] = React.useState('black')


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





  const handleMouseUp = () => {
    isDrawing.current = false
  }
 //undo last line
  const undoLast = () => {
    lines.pop()
    socket.emit('drawing', lines.concat(),props.roomNum)
    setLines(lines.concat())

  }
  // change background
  const sendBackground = (bgcolor) => {
    socket.emit('boardColor', bgcolor, props.roomNum)
  }

const useStyles = makeStyles({
 selected: {
   background: "#666666 !important",
   color: 'white'
 },
 pen: {
   background: "#666666 !important",
   color: 'white'
 },
 white: {
   background: 'white',
   '&:hover': {
       background: '#9c9c9c !important',
       color: 'white !important'
    },
  },
  black: {
    background: 'black',
    color: 'white',
    '&:hover': {
       background: '#9c9c9c !important',
       color: 'white !important'
    },
  },
  tiffanyBlue: {
    background: "#A0E7E5",
    '&:hover': {
        background: '#9c9c9c !important',
        color: 'white !important'
     },
    },
    yellow: {
      background: "#FBE7C6",
      '&:hover': {
          background: '#9c9c9c !important',
          color: 'white !important'
       },
      },
      hotPink: {
        background: "#FFAEBC",
        '&:hover': {
            background: '#9c9c9c !important',
            color: 'white !important'
         },
        },
        mint: {
          background: "#B4F8C8",
          '&:hover': {
              background: '#9c9c9c !important',
              color: 'white !important'
           },
    },
    lightBlue: {
      background: '#4deeea',
      '&:hover': {
        background: '#9c9c9c !important',
        color: 'white !important'
      },
    },
    lime: {
      background: '#74ee15',
      '&:hover': {
        background: '#9c9c9c !important',
        color: 'white !important'
      },
    },
    neonPink: {
      background: '#f000ff',
      color: 'white',
      '&:hover': {
        background: '#9c9c9c !important',
        color: 'white !important'
      },
    },
    red: {
      background: '#ff073a',
      color: 'white',
      '&:hover': {
        background: '#9c9c9c !important',
        color: 'white !important'
      },
    },
    orange: {
      background: '#FF5F1F',
      '&:hover': {
        background: '#9c9c9c !important',
        color: 'white !important'
      },
    },
   brown: {
     background: '#c3732a',
        '&:hover': {
           background: '#9c9c9c !important',
           color: 'white !important'
           },
   },
   penColor: {
     background: color,

     color: color === 'black' ||
     color === '#ff073a' ||
     color === '#f000ff' ?
     'white' : 'black'
   },
   bgColor: {
     background: background,

     color: background === 'black' ||
     background === '#ff073a' ||
     background === '#f000ff' ?
     'white' : 'black'
   }
});

const classes=useStyles()


  return (
    <div className='toolbar'>
        <Button className='undo' color='secondary' variant='contained' onClick={() => undoLast()}>UNDO</Button>
        {/* stroke size */}
        <input id="range" type="range" min='5' max='50' value={stroke} className='strokeScale drawTools' onChange={e => changeStroke(e.target.value)}/>


        {/* change background */}

        <div className='easel'>
        <Select
        className="drawTools"
        classes={{
          root: classes.bgColor,
        }}
        value={background}
        onChange={e => {
          sendBackground(e.target.value)
          setBackground(e.target.value)
          }}>
        <MenuItem  classes={{
          root: classes.white,
          selected: classes.selected
        }} value="white">White</MenuItem>

        <MenuItem  classes={{
          root: classes.black,
          selected: classes.selected
        }} value="black">Black</MenuItem>

        <MenuItem classes={{
          root: classes.hotPink,
          selected: classes.selected
        }} value="#FFAEBC">Hot Pink</MenuItem>

        <MenuItem classes={{
          root: classes.tiffanyBlue,
          selected: classes.selected
        }} value="#A0E7E5">Tiffany Blue</MenuItem>

        <MenuItem classes={{
          root: classes.mint,
          selected: classes.selected
        }} value="#B4F8C8">Mint</MenuItem>

        <MenuItem classes={{
          root: classes.yellow,
          selected: classes.selected
        }} value="#FBE7C6">Yellow</MenuItem>

        <MenuItem classes={{
          root: classes.lightBlue,
          selected: classes.selected
        }} value="#4deeea">Light Blue</MenuItem>

        <MenuItem classes={{
          root: classes.lime,
          selected: classes.selected
        }} value='#74ee15'>Lime</MenuItem>

        <MenuItem classes={{
          root: classes.neonPink,
          selected: classes.selected
        }} value="#f000ff">Neon Pink</MenuItem>

        <MenuItem classes={{
          root: classes.red,
          selected: classes.selected
        }} value="#ff073a">Red</MenuItem>

        <MenuItem classes={{
          root: classes.orange,
          selected: classes.selected
        }} value="#FF5F1F">Orange</MenuItem>

        <MenuItem classes={{
          root: classes.brown,
          selected: classes.selected
        }} value="#c3732a">Brown</MenuItem>
        </Select>


        {/* change draw colors */}
        <Select
        className="drawTools"
        classes={{
            root: classes.penColor,
            selected: classes.penColor
        }}
        value={color}
        onChange={e => changeColor(e.target.value)}>
         <MenuItem  classes={{
          root: classes.white,
          selected: classes.selected
        }} value="white">White</MenuItem>

        <MenuItem  classes={{
          root: classes.black,
          selected: classes.selected
        }} value="black">Black</MenuItem>

        <MenuItem classes={{
          root: classes.hotPink,
          selected: classes.selected
        }} value="#FFAEBC">Hot Pink</MenuItem>

        <MenuItem classes={{
          root: classes.tiffanyBlue,
          selected: classes.selected
        }} value="#A0E7E5">Tiffany Blue</MenuItem>

        <MenuItem classes={{
          root: classes.mint,
          selected: classes.selected
        }} value="#B4F8C8">Mint</MenuItem>

        <MenuItem classes={{
          root: classes.yellow,
          selected: classes.selected
        }} value="#FBE7C6">Yellow</MenuItem>

        <MenuItem classes={{
          root: classes.lightBlue,
          selected: classes.selected
        }} value="#4deeea">Light Blue</MenuItem>

        <MenuItem classes={{
          root: classes.lime,
          selected: classes.selected
        }} value='#74ee15'>Lime</MenuItem>

        <MenuItem classes={{
          root: classes.neonPink,
          selected: classes.selected
        }} value="#f000ff">Neon Pink</MenuItem>

        <MenuItem classes={{
          root: classes.red,
          selected: classes.selected
        }} value="#ff073a">Red</MenuItem>

        <MenuItem classes={{
          root: classes.orange,
          selected: classes.selected
        }} value="#FF5F1F">Orange</MenuItem>

        <MenuItem classes={{
          root: classes.brown,
          selected: classes.selected
        }} value="#c3732a">Brown</MenuItem>
      </Select>


      {/* tool selection */}
      <Select
        className="drawTools"
        value={tool}
        classes= {{
          root: classes.pen
        }}
        onChange={e => {
          setTool(e.target.value)
        }}
      >
        <MenuItem classes={{
          selected: classes.selected
        }} value="pen">Pen</MenuItem>
        <MenuItem classes={{
          selected: classes.selected
        }} value="eraser">Eraser</MenuItem>
        {/* <option value="fill">Fill</option> */}
      </Select>
      </div>
      <Stage
        width={500}
        height={500}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
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

export default Board
