import React from 'react'
import {connect} from 'react-redux'
import {sendMessage} from '../store/chatbox'

class Chatbox extends React.Component {
  constructor() {
    super()

    this.state = {
      message: '',
      handle: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeMessage = this.handleChangeMessage.bind(this)
    this.handleChangeHandle = this.handleChangeHandle.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
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

    const newMessage = `${handle}œ${message}`

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

  render() {
    const messages = this.props.chat.messages || []

    return (
      <div id="chat-box">
        <h2>CHATBOX</h2>
        <div id="chat-window">
          <div id="output">
            {messages.map((handleMessage, i) => {
              let handle = null;
              let message = null;
              for (let i = 0; i < handleMessage.length; i++){
                let currChar = handleMessage[i];
                if (currChar === 'œ'){
                  handle = handleMessage.slice(0, i);
                  message = handleMessage.slice(i + 1, handleMessage.length)
                }
              }
              return <div key={i}>
                <span className='handleColor'>{`${handle}:`}</span>{message}
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
