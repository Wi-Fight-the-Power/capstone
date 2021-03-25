import React from 'react';
import {connect} from 'react-redux';
import {nouns} from './gameFunctions'
import Chatbox from './chatbox';
import socket from '../socket'

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      seconds: this.props.seconds,
      points: 900,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.checkTime = this.checkTime.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisorForMinutes = secs % (60 * 60);
    let minutes = Math.floor(divisorForMinutes / 60);

    let divisorForSeconds = divisorForMinutes % 60;
    let seconds = Math.ceil(divisorForSeconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  checkTime(){
    socket.emit("countdown", 'data', this.props.roomNum)
    this.startTimer()
  }


  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    let points = this.state.points -10;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
      points: points
    });

    // Check if we're at zero.
    if (seconds == 0) {
      socket.emit('rotation', this.props.roomNum)
      clearInterval(this.timer);
      this.setState({seconds: this.props.seconds})
    }
  }

  render() {
    socket.on('timer',data=>{this.startTimer()})
    return(
      <div>
      <div className='buttonContainer'>
        <button className='testButtons' type='submit' onClick={this.checkTime}>Start</button>
        MIN: {this.state.time.m} SEC: {this.state.time.s} POINTS: {this.state.points} USERPOINTS: {this.state.userPoints}
      </div>
      <Chatbox points={this.state.points} roomNum={this.props.roomNum} />
      </div>
    );
  }
}

const mapState = state => {
  return {
    messages: state.chatbox.messages
  }
}

export default connect(mapState)(Timer)
