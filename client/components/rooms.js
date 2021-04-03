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
  }




  render() {
    return(
      <div className ='allthingscenter'>
        <h3>Sketchi Demo Rooms</h3>
        <div style={{padding: '20px'}}>
          <Link to="/game/1234">
          <Button
          style={{backgroundColor : "#6930C3"}}
            size="large"
            variant="contained"
            color="primary" >
            Join Room 1
          </Button>
          </Link>
        </div>
        <div style={{padding: '20px'}}>
          <Link to="/game/5678">
          <Button
          style={{backgroundColor : "#6930C3"}}
            size="large"
            variant="contained"
            color="primary" >
            Join Room 2
          </Button>
          </Link>
        </div>
        <div style={{padding: '20px'}}>
          <Link to="/game/9876">
          <Button
          style={{backgroundColor : "#6930C3"}}
            size="large"
            variant="contained"
            color="primary" >
            Join Room 3
          </Button>
          </Link>
        </div>
      </div>
    );
  }
}



export default Rooms
