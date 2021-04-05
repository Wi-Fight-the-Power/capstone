import io from 'socket.io-client'
import store from './store/index'
import {newMessage, updateScore, sendUser, getWord, updateDrawer, answered} from './store/game'

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

socket.on('recievingUserInfo', info => {
  store.dispatch(sendUser(info))
})


socket.on('word', word => {
  store.dispatch(getWord(word))
})

socket.on('drawer', drawer => {
  store.dispatch(updateDrawer(drawer))
})

socket.on('answered', answer => {
  store.dispatch(answered(answer))
})


export default socket
