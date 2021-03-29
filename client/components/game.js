import React from 'react'
import {connect} from 'react-redux';
import Board from './whiteboard'
import socket from '../socket'
import Timer from './timer'
import Scoreboard from './scoreboard'
import CreateUser from './createUser';
import ViewBoard from './whiteBoardViewer'
import {nouns} from './gameFunctions';
import {sendOrder} from '../store/game'

let word = () => {
  let index = Math.floor(Math.random() * nouns.length);
  return nouns[index];
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      me: this.props.me,
      rotation: this.props.users,
      seconds: 90,
      currentRotation: 1,
      view: true,
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
  const roomNum = this.props.match.params.id;

  return this.props.me.handle ? (
   this.state.me.isDrawer ? (
     <div className="drawinggame">
         <h1>Room code: {roomNum}</h1>
         <h1>You are the Drawer!!</h1>
         <h2>YOUR WORD IS: <span className='word'>{word().toUpperCase()}</span></h2>
         <Board roomNum={roomNum}/>
         <Scoreboard roomNum={roomNum}/>
       <Timer roomNum={roomNum} seconds={this.state.seconds} isDrawer={!this.state.view}/>
         {/* <button type="submit" id="room num" onClick={() => {this.changeView()}}>View/Draw</button> */}
       </div>
   )
   : (
     <div className="drawinggame">
         <h1>Room code: {roomNum}</h1>
         <h1>{this.state.rotation[0]} is Drawing!</h1>
         <ViewBoard roomNum={roomNum} />
         <Scoreboard roomNum={roomNum}/>
       <Timer roomNum={roomNum} seconds={this.state.seconds} isDrawer={!this.state.view}/>
         {/* <button type="submit" id="room num" onClick={() => {this.changeView()}}>View/Draw</button> */}
       </div>
   )
  )
  : (
  <div>
    <CreateUser roomNum={roomNum} />
  </div>
  )
}

}

const mapState = state => {
  return {
    users: state.game.users,
    me: state.game.me,
  }
}

const mapDispatch = dispatch => {
  return {
    sendOrder: (order, room) => dispatch(sendOrder(order, room))
  }
}

export default connect(mapState, mapDispatch)(Game)
