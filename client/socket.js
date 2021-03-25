import io from 'socket.io-client'
import store from './store/index'
import {newMessage, updateScore} from './store/chatbox'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('message', message => {
  store.dispatch(newMessage(message))
})

socket.on('score', score => {
  store.dispatch(updateScore(score))
})

export default socket
