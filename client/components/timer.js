import React from 'react';
import {connect} from 'react-redux';
import {nouns} from './gameFunctions'

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      time: {},
      seconds: 90,
      points: 900,
      userPoints: 0,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.correctGuess = this.correctGuess.bind(this);
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

  correctGuess(){
    let messages = this.props.messages;

    let {message} = messages[messages.length - 1];

    if (nouns.includes(message)){
      let userPoints = this.state.userPoints;
      this.setState({
        userPoints: userPoints += this.state.points,
      })
    }
    console.log(this.state.userPoints)
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
      clearInterval(this.timer);
    }
  }

  render() {
    return(
      <div>
      <div className='buttonContainer'>
        <button className='testButtons' type='submit' onClick={this.startTimer}>Start</button>
      </div>
      <div className='buttonContainer'>
        <button className='testButtons' type='submit' onClick={this.correctGuess}>Guess</button>
        MIN: {this.state.time.m} SEC: {this.state.time.s} POINTS: {this.state.points} USERPOINTS: {this.state.userPoints}
      </div>
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
