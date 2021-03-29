import React from 'react'
import socket from '../socket'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'

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
        this.props.history.push({pathname: `/game/${this.state.room}`
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
    <Link to="/createlobby"><Button color="primary" variant="contained">Create Room</Button></Link>
    <input
          id="room num"
          type="number"
          onChange={this.handleChange}
          value={this.state.handle}
          placeholder="4 Digit Number"
        />
    <Button color="primary" id="room num" variant="contained" onClick={this.handleSubmit} >
      Join Game
    </Button>
    </div>
  )
  }
}


export default LobbyRoom
