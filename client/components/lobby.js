import React from 'react'
import socket from '../socket'
import {Link} from 'react-router-dom'

class LobbyRoom extends React.Component{
  constructor() {
    super()
    this.state = {
      room:'',
    }
        //checking if 'room' to join exist
        socket.on('exist', state => {
          //doesn't exist
      if(!state){
        alert('room doesnt exist')
      }
          // room does exist
      else{
        this.props.history.push({
          pathname: `/game/${this.state.room}`
      })}
    })
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      room : event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    socket.emit("exist",this.state.room)
  }

  render(){
    return (
    <div >
    <h1>Lobby</h1>
    <Link to="/createlobby"><button type='button'>Create Room</button></Link>
    <input
          id="room num"
          type="number"
          onChange={this.handleChange}
          value={this.state.handle}
          placeholder="4 Digit Number"
        />
    <button type="submit" id="room num" onClick={this.handleSubmit} >
      Join Game
    </button>
    </div>
  )
  }
}


export default LobbyRoom
