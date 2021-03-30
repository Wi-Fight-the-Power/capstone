import React from 'react'
import {connect} from 'react-redux';
import Board from './whiteboard'
import socket from '../socket'
import Timer from './timer'
import Scoreboard from './scoreboard'
import CreateUser from './createUser';
import ViewBoard from './whiteBoardViewer'
import {sendOrder, sendWord} from '../store/game'
import {randomWord} from '../components/gameFunctions'


class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      me: this.props.me,
      seconds: 3,
      currentRotation: 0,
      joined: false,
    }

    socket.on('playerHasLeft', name => {
      console.log(name + ' Has left the game')
    })

    socket.on('rotate', (isDrawer, curRot) => {
      this.rotation(isDrawer, curRot)
    })

    socket.on('userJoined', (room) => {
      socket.emit('sendingUserInfo', this.props.me, room)
    })

    let newState = this.state
    socket.on('getRoomLength', isLength => {
      if(isLength){
        newState.me.isDrawer = true
        this.setState(newState)
      }
    })


    this.rotation = this.rotation.bind(this)
  }

  componentDidMount(){
  const roomNum = this.props.match.params.id
   const word = randomWord();
   console.log(word)
   this.props.sendWord(word, roomNum);

  if(!this.state.joined){
  this.setState({joined:true})
  socket.emit('userJoined', roomNum);
  console.log('hit or something');
  }

  this.setState({joined:true})

    socket.emit('Join Room', roomNum);

    socket.emit('getRoomLength', roomNum);
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
    this.props.sendWord(randomWord(), this.props.roomNum);
  }




render(){
  const roomNum = this.props.match.params.id;

  return this.props.me.handle ? (
   this.state.me.isDrawer ? (
     <div className="drawinggame">
         <h1>Room code: {roomNum}</h1>
         <h1>Get Sketchi!</h1>
         <h2>YOUR WORD IS: <span className='word'>{this.props.word.toUpperCase()}</span></h2>
         <Board roomNum={roomNum}/>
         <Scoreboard roomNum={roomNum}/>
         <Timer roomNum={roomNum} seconds={this.state.seconds} isDrawer={true} curRot={this.state.currentRotation}/>
       </div>
   )
   : (
     <div className="drawinggame">
         <h1>Room code: {roomNum}</h1>
         <h1>{this.props.users[this.state.currentRotation].handle} is Sketchi!</h1>
         <ViewBoard roomNum={roomNum} />
         <Scoreboard roomNum={roomNum}/>
         <Timer roomNum={roomNum} seconds={this.state.seconds} isDrawer={false} curRot={this.state.currentRotation} />
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
    word: state.game.word,
  }
}


const mapDispatch = dispatch => {
  return {
    sendOrder: (order, room) => dispatch(sendOrder(order, room)),
    sendWord: (word, room) => dispatch(sendWord(word, room))
  }
}

export default connect(mapState, mapDispatch)(Game)
