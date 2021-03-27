import io from 'socket.io-client'
import store from './store/index'
import {newMessage, updateScore, sendUser} from './store/game'

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

socket.on('user', user => {
  store.dispatch(sendUser(user))
})

export default socket
