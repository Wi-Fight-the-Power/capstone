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
      view: true,

    }
    this.changeView = this.changeView.bind(this)
  }
  componentDidMount(){
    const roomNum = this.props.match.params.id
    socket.emit('Join Room', roomNum);
  }

  componentWillUnmount(){
    socket.emit('leaveRoom', )
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
        <ViewBoard roomNum={roomNum}/>
        <Scoreboard />
      <Timer roomNum={roomNum}/>
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
      <Timer roomNum={roomNum}/>
        <button type="submit" id="room num" onClick={() => {this.changeView()}}>View/Draw</button>
      </div>
    )
  }
  }
}

export default Mvp
