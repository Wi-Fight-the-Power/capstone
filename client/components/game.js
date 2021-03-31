import React from 'react'
import {connect} from 'react-redux';
import Board from './whiteboard'
import socket from '../socket'
import Timer from './timer'
import Scoreboard from './scoreboard'
import CreateUser from './createUser'
import Winner from './winner'
import ViewBoard from './whiteBoardViewer'
import {sendOrder, sendWord, drawerUpdate} from '../store/game'
import {randomWord} from '../components/gameFunctions'
import Playernotify from './playerleaving'


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

    socket.on('rotate', (isDrawer, curRot, drawerHandle) => {
      this.rotation(isDrawer, curRot)
      this.props.sendDrawer(drawerHandle, this.props.match.params.id);
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
   this.props.sendWord(word, roomNum);

  if(!this.state.joined){
  this.setState({joined:true})
  socket.emit('userJoined', roomNum);
  }



  this.setState({joined:true})

  socket.emit('Join Room', roomNum);

  socket.emit('getRoomLength', roomNum);
  }

    componentWillUnmount(){
    const roomNum = this.props.match.params.id;
    socket.emit('leaveRoom', roomNum);
    }

  rotation(isDrawer, curRot){
    let newState = this.state
    if(isDrawer){
      console.log(curRot)
      newState.me.isDrawer = true;
      newState.currentRotation = curRot
      this.setState(newState)
      const word = randomWord();
      const roomNum = this.props.match.params.id
      this.props.sendWord(word, roomNum);
    }
    if(!isDrawer){
      newState.me.isDrawer = false;
      newState.currentRotation = curRot
      this.setState(newState)
    }

  }




render(){
  const roomNum = this.props.match.params.id;

  const winner = this.props.users.filter(user => {
    return user.score > 5000
  })

  const drawer = this.props.drawer || 'Someone'


  return this.props.me.handle ? (
   winner.length === 1
   ? (
     <Winner roomNum={roomNum} />
   ) : (
     this.state.me.isDrawer ? (
     <div className="drawinggame">
         <h1>Room code: {roomNum}</h1>
         <h1>Get Sketchi!</h1>
         <h2>YOUR WORD IS: <span className='word'>{this.props.word.toUpperCase()}</span></h2>
      <div className='chatlayout'>
          <div className='board'>
         <Board roomNum={roomNum}/>
         </div>
         <Scoreboard roomNum={roomNum}/>
         <Playernotify/>
         <Timer roomNum={roomNum} seconds={this.state.seconds} isDrawer={true} curRot={this.state.currentRotation}/>
         </div>
         </div>
   ) : (
     <div className="drawinggame">
         <h1>Room code: {roomNum}</h1>
         <h1>{drawer} is Sketchi!</h1>
      <div className='chatlayout'>
          <div className='board'>
         <ViewBoard roomNum={roomNum} />
          </div>
         <Scoreboard roomNum={roomNum}/>
         <Playernotify/>
         <Timer roomNum={roomNum} seconds={this.state.seconds} isDrawer={false} curRot={this.state.currentRotation} />
       </div>
     </div>
   )
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
    drawer: state.game.drawer,
  }
}


const mapDispatch = dispatch => {
  return {
    sendOrder: (order, room) => dispatch(sendOrder(order, room)),
    sendWord: (word, room) => dispatch(sendWord(word, room)),
    sendDrawer: (drawer, room) => dispatch(drawerUpdate(drawer, room))
  }
}

export default connect(mapState, mapDispatch)(Game)
