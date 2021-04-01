import React from 'react';
import {connect} from 'react-redux';
import Chatbox from './chatbox';
import socket from '../socket'
import {randomWord} from './gameFunctions'
import {sendWord, updateAnswer} from '../store/game';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      seconds: this.props.seconds,
      points: 900,
      visible: true,
    };
    socket.on('timer', data => {this.startTimer()})
    this.timer = 0;
    this.countingDown = false
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.checkTime = this.checkTime.bind(this);
    this.newWord = this.newWord.bind(this);
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
    this.setState({
      visible: false,
    })
  }


  startTimer() {
    this.countingDown = true;
    if (this.countingDown) {
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
      this.timer = 0;
      this.countingDown = false;
      this.setState({seconds: this.props.seconds, time: this.secondsToTime(this.props.seconds), points: 900});
      // sending rotation to socket
      if(this.props.isDrawer){
        let rotNum = this.props.curRot
        rotNum += 1
        socket.emit('rotation', rotNum, this.props.roomNum)
        this.setState({
          visible: true
        })
        this.props.updateAnswer(false);
      }
    }
  }

  newWord(){
    console.log('i have been clicked bro');
   const roomNum = this.props.roomNum;
   const word = randomWord();
   this.props.sendWord(word, roomNum);
  }

  render() {

    return(
      <div>
      <div className='buttonContainer'>
        {this.props.isDrawer
        ? ( this.state.visible
          ? (
          <div>
             <button className='testButtons' type='submit' onClick={this.checkTime}>Start</button>
             <h2>MIN: {this.state.time.m} SEC: {this.state.time.s} POINTS: {this.state.points}</h2>
          </div>
          ) : (
          <div>
             <h2>YOUR WORD IS: <span className='word'>{this.props.word.toUpperCase()}</span></h2>
             <button className='newWord' type='button' onClick={this.newWord}>IMG</button>
             <h2>MIN: {this.state.time.m} SEC: {this.state.time.s} POINTS: {this.state.points}</h2>
          </div>
          )
        )
        : (
        <h2>MIN: {this.state.time.m} SEC: {this.state.time.s} POINTS: {this.state.points}</h2>)}
      </div>
      <Chatbox points={this.state.points} roomNum={this.props.roomNum} isDrawer={this.props.isDrawer}/>
      </div>
    );
  }
}

const mapState = state => {
  return {
    messages: state.game.messages,
    word: state.game.word
  }
}

const mapDispatch = dispatch => {
  return {
    sendWord: (word, room) => dispatch(sendWord(word, room)),
    updateAnswer: (answer) => dispatch(updateAnswer(answer)),
  }
}


export default connect(mapState, mapDispatch)(Timer)
