import React from 'react'
import {connect} from 'react-redux'
import {sendMessage, sendScore, updateAnswer} from '../store/game'
import {Howl} from 'howler'

class Chatbox extends React.Component {
  constructor(props) {
    super(props)

    this.chatContainer = React.createRef();

    this.state = {
      message: '',
      handle: this.props.me ? this.props.me.handle : 'john',
    }

    if (this.props.users.length >= 2){
      let guessers = this.props.users.filter(user => {
        return user.handle !== this.props.drawer
      }) || '[]';
      let correctGuessers = guessers.filter(guesser => {
        return guesser.answered
      }) || '[]';

      console.log(guessers, 'guessers');
      console.log(correctGuessers, 'correct');

      if (guessers.length === correctGuessers.length){
        console.log('rotation called');
        this.props.rotation()
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeMessage = this.handleChangeMessage.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.scrollToMyRef = this.scrollToMyRef.bind(this)
  }


  componentDidUpdate(){
    this.scrollToMyRef();
  }

  handleChangeMessage(event) {
    this.setState({
      message: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let message = this.state.message
    const scoreHandle = this.state.handle
    let handle = this.state.handle
    let score = 0

    if (this.props.word === message.toLowerCase() && !this.props.me.answered){
      this.props.updateAnswer({handle: handle, answer: true}, this.props.roomNum);
      message = `${handle} GOT THE ANSWER +${this.props.points} points`
      handle = 'SKETCHI'
      score = this.props.points;
      var correct = new Howl({
      src: ['/correct.mp3'],
      volume: 0.7,
    })
      correct.play()
    } else if (this.props.word === message.toLowerCase() && this.props.me.answered){
        message = `${handle} is being superrrrrr Sketchi`
        handle = 'SKETCHI'
      var sound = new Howl({
      src: ['/bruh.mp3'],
      volume: 0.7,
    })
      sound.play()
      }

    const newScore = {
      handle: scoreHandle,
      score: score
    }
    const newMessage = {
      handle: handle,
      message: message
    }

    if (newScore.score !== 0){
      this.props.sendScore(newScore, this.props.roomNum);
      this.props.sendScore({handle: this.props.drawer, score: 100}, this.props.roomNum);
    }

    if (newMessage.message !== ''){
      this.props.sendMessage(newMessage,this.props.roomNum);
    }


    this.setState({
      message: '',
    })
  }


  handleKeyPress(event){
    if (event.keyCode === 13){
      this.handleSubmit();
    }
  }

  scrollToMyRef = () => {
    const scroll =
      this.chatContainer.current.scrollHeight -
      this.chatContainer.current.clientHeight;
    this.chatContainer.current.scrollTo(0, scroll);
  };

  render() {

    const messages = this.props.game.messages || []


    return (
      <div id="chat-box">
        <h2>CHAT</h2>
        <div ref={this.chatContainer} id="chat-window">
          <div id="output" >
            {messages.map((object, i) => {
              let handle = object.handle;
              let message = object.message;

              return <div key={i}>
                <span className={handle === this.state.handle
                  ? 'handleColor'
                  : 'handleColor-rec'
                  }>{`${handle}:`}</span>{message}
                </div>
            })}
          </div>
          <div id="feedback" />
        </div>
        <form>
          {this.props.isDrawer
          ? (
            null
            ) : (
              <input
          id="message"
          type="text"
          onChange={this.handleChangeMessage}
          onKeyPress={this.handleKeyPress}
          value={this.state.message}
          placeholder="Message"
        />
            )}
        <button type="submit" id="send" onClick={this.handleSubmit} >
          SEND
        </button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    game: state.game,
    users: state.game.users,
    me: state.game.me,
    word: state.game.word,
    answered: state.game.answered,
    drawer: state.game.drawer
  }
}

const mapDispatch = dispatch => {
  return {
    sendMessage: (message,room) => dispatch(sendMessage(message, room)),
    sendScore: (score, room) => dispatch(sendScore(score, room)),
    updateAnswer: (answer, room) => dispatch (updateAnswer(answer, room)),
  }
}

export default connect(mapState, mapDispatch)(Chatbox)
