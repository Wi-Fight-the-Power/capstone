import React from 'react'
import socket from '../socket'
import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
// import IsUser from './createUserName'
import Button from '@material-ui/core/Button';
import Rooms from './rooms'


class LobbyRoom extends React.Component{
  constructor() {
    super()
    this.state = {
      room:'',
      roomErrormessage:'',
      error:false
    }
        //checking if 'room' to join exist
        socket.on('exist', state => {
          //doesn't exist
      if(!state){
        // alert('room doesnt exist')
        this.setState({
          roomErrormessage:'Room Doesnt Exist',
          error:true
        })

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

  componentWillUnmount(){
    location.reload();
  }

  handleChange(event) {
    this.setState({
      room : event.target.value,
      roomErrormessage:'',
      error:false
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    socket.emit("exist",this.state.room)
  }


  render(){
    return (
    <div className='allthingscenter'>


        <Link to="/createlobby"  style={{padding: '20px'}}>
      <Button
      style={{
        backgroundColor : "#6930C3",
        padding: '10px'
      }}
      size="large"
      variant="contained"
      color="primary" >
          Create Room
        </Button>
    </Link>

      <TextField
    error={this.state.error}
    id="room num"
    label="RoomNumber"
    variant="outlined"
    type="number"
    onChange={this.handleChange}
    value={this.state.handle}
    helperText={this.state.roomErrormessage}
    />


    <Button
    style={{backgroundColor : "#6930C3"}}
      id="room num"
      type="submit"
      size="large"
      variant="contained"
      color="primary"
      onClick={this.handleSubmit} >
          Join Game
        </Button>

    <Rooms/>
    </div>
  )
  }

}


export default LobbyRoom
