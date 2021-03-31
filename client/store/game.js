import socket from '../socket'

const initialState = {
  messages: [],
  users: [],
  me: {},
  order: [],
  word: '',
  drawer: ''
}

//action types

const NEW_MESSAGE = 'GOT_MESSAGE'
const UPDATE_SCORE = 'UPDATE_SCORE';
const NEW_USER = 'NEW_USER';
const ME = 'ME';
const UPDATE_ORDER = 'UPDATE_ORDER';
const GET_WORD = 'GET_WORD';
const UPDATE_DRAWER = 'UPDATE_DRAWER';

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

export const setMe = (me) => {
  return {
    type: ME,
    me,
  }
}



export const updateOrder = order => {
  return {
    type: UPDATE_ORDER,
    order,
  }
}

export const getWord = word => {
  return {
    type: GET_WORD,
    word,
  }
}

export const updateDrawer = drawer => {
  return {
    type: UPDATE_DRAWER,
    drawer,
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
    dispatch(newUser(user));
    socket.emit('user', user, room)
  } catch (error){
    console.log(error);
  }
}

export const sendMe = (me) => dispatch => {
  try {
    dispatch(setMe(me));
  } catch (error) {
  console.log(error);
  }
}

export const sendOrder = (order, room) => dispatch => {
  try {
    dispatch(updateOrder(order));
    socket.emit('order', order, room)
  } catch (error) {
    console.log(error);
  }
}

export const sendWord = (word, room) => dispatch => {
  try {
    dispatch(getWord(word));
    socket.emit('word', word, room);
  } catch (error){
    console.log(error)
  }
}


export const drawerUpdate = (drawer, room) => dispatch => {
  try {
    dispatch (updateDrawer(drawer));
    socket.emit('drawer', drawer, room);
  } catch (error){
    console.log(error)
  }
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
    case ME:
      return {
        ...state,
        me: action.me
      }
    case UPDATE_ORDER:
      return {
        ...state,
        order: action.order
      }
    case GET_WORD:
      return {
        ...state,
        word: action.word
      }
    case UPDATE_DRAWER:
      return {
        ...state,
        drawer: action.drawer
      }
    default:
      return state
  }
}
