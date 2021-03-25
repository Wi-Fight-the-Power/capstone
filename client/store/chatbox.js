import socket from '../socket'

//action types

const NEW_MESSAGE = 'GOT_MESSAGE'
const UPDATE_SCORE = 'UPDATE_SCORE';

//action creators

export const newMessage = message => {
  return {
    type: NEW_MESSAGE,
    message
  }
}

export const updateScore = score => {
  return {
    type: UPDATE_SCORE,
    score
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

export const sendScore = score => dispatch => {
  try {
    dispatch(updateScore(score))
    socket.emit('score', score)
  } catch (error){
    console.log(error);
  }
}

const initialState = {
  messages: [],
  score: [],
}

//reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      }
    case UPDATE_SCORE:
        return {
          ...state,
          score: [...state.score, action.score]
        }
    default:
      return state
  }
}
