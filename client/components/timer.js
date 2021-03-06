import React from 'react';
import {connect} from 'react-redux';
import Chatbox from './chatbox';
import socket from '../socket'
import {Howl} from 'howler'
import {randomWord} from './gameFunctions'
import {sendWord} from '../store/game';
import LoopIcon from '@material-ui/icons/Loop';
import Button from '@material-ui/core/Button';



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

    var yoo = new Howl({
      src: ['/boxingbell.mp3'],
      volume: 0.7,
    })
    yoo.play()

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
    if (seconds === 0) {
      clearInterval(this.timer);
      this.timer = 0;
      this.countingDown = false;
      this.setState({seconds: this.props.seconds, time: this.secondsToTime(this.props.seconds), points: 900});
      // sending rotation to socket
      if(this.props.isDrawer){
        this.setState({
          visible: true
        })
        let rotNum = this.props.curRot
        rotNum += 1
        setTimeout(() => {socket.emit('rotation', rotNum, this.props.roomNum)}, 750);
      }
    }
    // time running out sound effect
    if (seconds == 9){
      var sound = new Howl({
      src: ['/ClockTicking.mp3'],
      volume: 0.7,
    })
      sound.play()
    }
  }


  newWord(){
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
          <div className='buttonContainer'>
             <Button
             color='secondary'
             style={{backgroundColor: "green"}}
             variant='contained'
             size='medium'
             onClick={this.checkTime}>
               START
             </Button>
             <h2 className='points-word'>MIN: {this.state.time.m} SEC: {this.state.time.s} POINTS: {this.state.points}</h2>
          </div>
          ) : (
          <div className='buttonContainer'>
             <h2 className='points-word'>YOUR WORD IS: <span className='word'>{this.props.word.toUpperCase()}</span></h2>

      <Button color="primary" variant="contained" className='newWord' type='button' onClick={this.newWord}>
        <LoopIcon />
      </Button>
             <h2 className='points-word'>MIN: {this.state.time.m} SEC: {this.state.time.s} POINTS: {this.state.points}</h2>
          </div>
          )
        )
        : (
        <h2 className='points-word'>MIN: {this.state.time.m} SEC: {this.state.time.s} POINTS: {this.state.points}</h2>)}
      </div>
      <Chatbox points={this.state.points} roomNum={this.props.roomNum} isDrawer={this.props.isDrawer} rotation={this.props.rotation}/>
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
  }
}


export default connect(mapState, mapDispatch)(Timer)
