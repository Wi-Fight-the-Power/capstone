import React from 'react'
import {connect} from 'react-redux'
import {sendMessage} from '../store/chatbox'
import {nouns} from './gameFunctions'

class Chatbox extends React.Component {
  constructor() {
    super()
    this.chatContainer = React.createRef();

    this.state = {
      message: '',
      handle: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeMessage = this.handleChangeMessage.bind(this)
    this.handleChangeHandle = this.handleChangeHandle.bind(this)
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

  handleChangeHandle(event) {
    this.setState({
      handle: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const message = this.state.message
    const handle = this.state.handle

    const newMessage = {
      handle: handle,
      message: message
    }

    this.props.sendMessage(newMessage);
    this.setState({
      message: ''
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
    const messages = this.props.chat.messages || []

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
        <input
          id="handle"
          type="text"
          onChange={this.handleChangeHandle}
          value={this.state.handle}
          placeholder="Handle"
        />
        <form>
        <input
          id="message"
          type="text"
          onChange={this.handleChangeMessage}
          onKeyPress={this.handleKeyPress}
          value={this.state.message}
          placeholder="Message"
        />
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
    chat: state.chatbox
  }
}

const mapDispatch = dispatch => {
  return {
    sendMessage: message => dispatch(sendMessage(message))
  }
}

export default connect(mapState, mapDispatch)(Chatbox)
