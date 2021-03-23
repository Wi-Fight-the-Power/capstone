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


export const sendDrawing = (lines) => socket.emit('drawing', lines)

export function getDrawing() {
  return socket.on('drawing', lines => lines)
}
// export const getDrawing = () => socket.on('drawing', drawn => (drawn))
export default socket
