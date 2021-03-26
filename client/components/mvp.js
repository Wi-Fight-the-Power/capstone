import React from 'react'
import Board from './whiteboard'
import socket from '../socket'
import Timer from './timer'
import Scoreboard from './scoreboard'
import ViewBoard from './whiteBoardViewer'

class Mvp extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      view: true, // changing on rotation
      currentRotation: 1,
      seconds: 90,
    }
    socket.on('rotation', isViewer => {this.rotation(isViewer)} )
    this.changeView = this.changeView.bind(this)
    this.rotation = this.rotation.bind(this)
  }
  componentDidMount(){
    const roomNum = this.props.match.params.id
    socket.emit('Join Room', roomNum);
  }

  componentWillUnmount(){
    socket.emit('leaveRoom', )
  }

  rotation(isViewer){
    let rotationNum = this.state.currentRotation
    console.log(isViewer)
      if(isViewer){
        this.setState({view: true, currentRotation: rotationNum++})
        console.log('should not be drawering')
      } else if (!isViewer) {
        this.setState({view: false, currentRotation: rotationNum++})
        console.log('should be drwaing')
      }

  }

  changeView(){
    const currentView = this.state.view
    this.setState({view: !currentView})
  }

  render(){
    const roomNum = this.props.match.params.id

  if(this.state.view){
    return (
      <div className="drawinggame">
        <h1>Room code:{roomNum}</h1>
        <h1>Viewer</h1>
        <ViewBoard roomNum={roomNum} />
        <Scoreboard />
      <Timer roomNum={roomNum} seconds={this.state.seconds} isDrawer={!this.state.view}/>
        <button type="submit" id="room num" onClick={() => {this.changeView()}}>View/Draw</button>
      </div>
    )
  }
  if(!this.state.view){
    return (
      <div className="drawinggame">
        <h1>Room code:{roomNum}</h1>
        <h1>Drawer</h1>
        <Board roomNum={roomNum}/>
        <Scoreboard />
      <Timer roomNum={roomNum} seconds={this.state.seconds} isDrawer={!this.state.view}/>
        <button type="submit" id="room num" onClick={() => {this.changeView()}}>View/Draw</button>
      </div>
    )
  }
  }
}

export default Mvp
