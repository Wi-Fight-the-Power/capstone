import React from 'react';
import socket from '../socket'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';


class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms:[]
    }
    socket.on('roomNum',room=>{
    // this.setState(prevState =>{
    // return{
    //   ...prevState,
    //     rooms : [...prevState.rooms, room]
    // }

// })
console.log('room',room)
  })

  // socket.on('Leave Room', roomNum)
  }




  render() {
    // console.log(this.state.rooms,'rooms')
    return(
      <div>
        <h3>Sketchi Demo Rooms</h3>
        <div>
          <Link to="/game/1234">
          <Button
            size="large"
            variant="contained"
            color="primary" >
            Join Room1
          </Button>
          </Link>
        </div>
        <div>
          <Link to="/game/5678">
          <Button
            size="large"
            variant="contained"
            color="primary" >
            Join Room2
          </Button>
          </Link>
        </div>
        <div>
          <Link to="/game/9876">
          <Button
            size="large"
            variant="contained"
            color="primary" >
            Join Room3
          </Button>
          </Link>
        </div>
      </div>
    );
  }
}



export default Rooms
