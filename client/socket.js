import io from 'socket.io-client'
import store from './store/index'
import {newMessage} from './store/chatbox'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('message', message => {
  store.dispatch(newMessage(message))
})

// export const joinRoom = (room) => { socket.emit('Join Room', room) }

export default socket
