import React from 'react'
import socket from '../socket'
import {Redirect} from 'react-router-dom'

class LobbyRoom extends React.Component{
  constructor() {
    super()
    this.state = {
      room:'',
      roomvalid:false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      room : event.target.value
    })
    console.log(this.state)
  }
  handleSubmit(event) {
    event.preventDefault()
    // console.log(this.state.room)
    // let passfail;
    socket.emit("exist",this.state.room)
    // socket.on("exist",state=> {passfail = state})
    socket.on('exist', state => {
      console.log(state)
      // if(state){return <Redirect to={{ pathname: '/mvp', state: { room: this.state.room } }}>join room</Redirect>}
      // else{alert('room doesnt exist')}
      if(!state){alert('room doesnt exist')}
      else{this.setState({
        roomvalid:true
      })}

    })
    // console.log(passfail)
    // if(passfail){console.log(passfail)}
    // else {Window.alert('room doesnt exist')}
  }
  componentWillUnmount = () => {
    this.setState({
      room:'',
      roomvalid:false
    })
  };

  render(){
    if(this.state.roomvalid){return<Redirect to={{ pathname: '/mvp', state: { room: this.state.room } }}>join room</Redirect>}
    return (
    <div >
    <h1>Lobby</h1>
    <button>Create Room</button>
    <input
          id="room num"
          type="number"
          onChange={this.handleChange}
          value={this.state.handle}
          placeholder="4 Digit Number"
        />
    {/* <Link to={{ pathname: '/mvp', state: { room: this.state.room } }}>join room</Link> */}
    <button type="submit" id="room num" onClick={this.handleSubmit} >Join Game</button>
    </div>
  )
  }
}


export default LobbyRoom

//notes
//should show room name, #player/#maxplayer, join room button
