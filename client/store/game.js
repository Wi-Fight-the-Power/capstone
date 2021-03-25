import socket from '../socket'

//action types

const NEW_MESSAGE = 'GOT_MESSAGE'
const UPDATE_SCORE = 'UPDATE_SCORE';
const NEW_USER = 'NEW_USER';


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

export const newUser = (user) => {
  return {
    type: NEW_USER,
    user,
  }
}

//thunks

export const sendMessage = (message,room) => dispatch => {
  try {
    dispatch(newMessage(message))

    socket.emit('message', message, room)
  } catch (error) {
    console.log(error)
  }
}

export const sendScore = (score, room) => dispatch => {
  try {
    dispatch(updateScore(score))
    socket.emit('score', score, room)
  } catch (error){
    console.log(error);
  }
}

export const sendUser = (user, room) => dispatch => {
  try {
    console.log(user, 'inside the thunk')
    dispatch(newUser(user));
    socket.emit('user', user, room)
  } catch (error){
    console.log(error);
  }
}

const initialState = {
  messages: [],
  users: []
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
      let handle = action.score.handle;
      let newScore = action.score.score;
      for (let i = 0; i < state.users.length; i++){
        if (handle === state.users[i].handle){
          state.users[i].score += newScore;
        }
      }
      return {
        ...state,
        users: [...state.users]
      }
    case NEW_USER:
      return {
        ...state,
        users: [...state.users, action.user]
      }
    default:
      return state
  }
}
