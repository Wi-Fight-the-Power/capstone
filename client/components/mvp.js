import React from 'react'
import Board from './whiteboard'
import socket from '../socket'
import Timer from './timer'
import Scoreboard from './scoreboard'
import CreateUser from './createUser';
import ViewBoard from './whiteBoardViewer'

class Mvp extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      view: true, // changing on rotation
      currentRotation: 1,
      seconds: 5,
    }
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

  rotation(isDrawer){
    let rotationNum = this.state.currentRotation

      if(isDrawer){
        this.setState({view: false, currentRotation: rotationNum++})
        console.log(this.state)
      } else {
        this.setState({view: true, currentRotation: rotationNum++})
        console.log(this.state)
      }

  }

  changeView(){
    const currentView = this.state.view
    this.setState({view: !currentView})
  }

  render(){
    const roomNum = this.props.match.params.id
     socket.on('rotation', isDrawer => {this.rotation(isDrawer)} )
  if(this.state.view){
    return (
      <div className="drawinggame">
        <h1>Room code:{roomNum}</h1>
        <h1>Viewer</h1>
        <CreateUser roomNum={roomNum} />
        <ViewBoard roomNum={roomNum} />
        <Scoreboard />
      <Timer roomNum={roomNum} seconds={5}/>
        <button type="submit" id="room num" onClick={() => {this.changeView()}}>View/Draw</button>
      </div>
    )
  }
  if(!this.state.view){
    return (
      <div className="drawinggame">
        <h1>Room code:{roomNum}</h1>
        <h1>Drawer</h1>
        <CreateUser roomNum={roomNum} />
        <Board roomNum={roomNum}/>
        <Scoreboard />
      <Timer roomNum={roomNum} seconds={this.state.seconds}/>
        <button type="submit" id="room num" onClick={() => {this.changeView()}}>View/Draw</button>
      </div>
    )
  }
  }
}

export default Mvp
