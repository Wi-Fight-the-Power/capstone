import socket from '../socket'

//action types

const NEW_MESSAGE = 'GOT_MESSAGE'

//action creators

export const newMessage = message => {
  return {
    type: NEW_MESSAGE,
    message
  }
}

//thunks

export const sendMessage = (message,room) => dispatch => {
  try {
    dispatch(newMessage(message))

    socket.emit('message', message,room)
  } catch (error) {
    console.log(error)
  }
}

const initialState = {
  messages: []
  //handle: ''
}

//reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
        //handle: action.handle
      }
    default:
      return state
  }
}
