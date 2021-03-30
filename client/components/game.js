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
      seconds: 3,
      currentRotation: 0,
      joined: false,
    }
    socket.on('rotate', (isDrawer, curRot) => {
      this.rotation(isDrawer, curRot)
    })

        socket.on('userJoined', () => {
      socket.emit('sendingUserInfo', this.props.me, this.props.roomNum)
    })

                let newState = this.state
        socket.on('getRoomLength', isLength => {
      console.log(isLength)
        if(isLength){
          newState.me.isDrawer = true
          this.setState(newState)
        }
      })


    this.rotation = this.rotation.bind(this)
  }

  componentDidMount(){

      if(!this.state.joined){
    socket.emit('userJoined', this.props.roomNum);
  }
  this.setState({joined:true})

    const roomNum = this.props.match.params.id
    socket.emit('Join Room', roomNum);

    console.log('about to get room length')
    socket.emit('getRoomLength', roomNum)

        socket.on('userJoined', () => {
      socket.emit('sendingUserInfo', this.props.me, this.props.roomNum)
    })

    }

  componentWillUnmount(){
    const roomNum = this.props.match.params.id
    socket.emit('Leave Room', roomNum)
  }

  rotation(isDrawer, curRot){
    let newState = this.state
    if(isDrawer){
      console.log(curRot)
      newState.me.isDrawer = true;
      newState.currentRotation = curRot
      this.setState(newState)
    }
    if(!isDrawer){
      newState.me.isDrawer = false;
      newState.currentRotation = curRot
      this.setState(newState)
    }
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
       <Timer
       roomNum={roomNum}
       seconds={this.state.seconds}
       isDrawer={true}
       curRot={this.state.currentRotation}
       />
       </div>
   )
   : (
     <div className="drawinggame">
         <h1>Room code: {roomNum}</h1>
         <h1>You aren't: is Drawing!</h1>
         <ViewBoard roomNum={roomNum} />
         <Scoreboard roomNum={roomNum}/>
       <Timer
       roomNum={roomNum}
       seconds={this.state.seconds}/>
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
