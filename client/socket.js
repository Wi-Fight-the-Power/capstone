import io from 'socket.io-client'
import store from './store/index'
import {newMessage, updateScore, sendUser, updateOrder, getWord} from './store/game'

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

socket.on('order', order => {
  store.dispatch(updateOrder(order));
})

socket.on('word', word => {
  store.dispatch(getWord(word))
})


export default socket
