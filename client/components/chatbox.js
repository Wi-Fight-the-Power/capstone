import React from 'react'
import {connect} from 'react-redux'
import {sendMessage, sendScore} from '../store/game'


class Chatbox extends React.Component {
  constructor(props) {
    super(props)

    this.chatContainer = React.createRef();

    this.state = {
      message: '',
      handle: this.props.me ? this.props.me.handle : 'john',
      answer: false,
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
    let handle = this.state.handle
    let score = 0

      if (this.props.word === message.toLowerCase() && !this.state.answer){
        message = `${handle} GOT THE ANSWER +${this.props.points} points`
        handle = 'SKETCHI'
      score = this.props.points;
      this.setState({
        answer: true
      })
    } else if (this.props.word === message.toLowerCase() && this.state.answer){
      message = ` ${handle} is being superrrrrr Sketchi`
      handle = 'SKETCHI'
    }

    const newScore = {
      handle: handle,
      score: score
    }
    const newMessage = {
      handle: handle,
      message: message
    }
    this.props.sendScore(newScore, this.props.roomNum);

    this.props.sendMessage(newMessage,this.props.roomNum);
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
        <h2>CHATBOX</h2>
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
          Send
        </button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    game: state.game,
    me: state.game.me,
    word: state.game.word,
  }
}

const mapDispatch = dispatch => {
  return {
    sendMessage: (message,room) => dispatch(sendMessage(message, room)),
    sendScore: (score, room) => dispatch(sendScore(score, room))
  }
}

export default connect(mapState, mapDispatch)(Chatbox)
