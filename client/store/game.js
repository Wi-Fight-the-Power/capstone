import socket from '../socket'

const initialState = {
  messages: [],
  users: [],
  me: {},
  word: '',
  drawer: '',
}

//action types

const NEW_MESSAGE = 'GOT_MESSAGE'
const UPDATE_SCORE = 'UPDATE_SCORE';
const NEW_USER = 'NEW_USER';
const ME = 'ME';
const GET_WORD = 'GET_WORD';
const UPDATE_DRAWER = 'UPDATE_DRAWER';
const ANSWERED = 'ANSWERED';

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

export const answered = answer => {
  return {
    type: ANSWERED,
    answer
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
    dispatch(updateDrawer(drawer));
    socket.emit('drawer', drawer, room);
  } catch (error){
    console.log(error)
  }
}

export const updateAnswer = (answer, room) => dispatch => {
  try {
    dispatch(answered(answer));
    socket.emit('answered', answer, room);
  } catch (error){
    console.log(error);
  }
}



//reducer

// eslint-disable-next-line complexity
export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      }
    case UPDATE_SCORE:
      // eslint-disable-next-line no-case-declarations
      let handle = action.score.handle;
      // eslint-disable-next-line no-case-declarations
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
    case ANSWERED:
      // eslint-disable-next-line no-case-declarations
      let answerHandle = action.answer.handle;
      // eslint-disable-next-line no-case-declarations
      let newAnswer = action.answer.answer;
      for (let i = 0; i < state.users.length; i++){
        if (answerHandle === state.users[i].handle){
          state.users[i].answered = newAnswer;
        }
      }
      return {
        ...state,
        users: [...state.users]
      }
    default:
      return state
  }
}
