import React from 'react'
import socket from '../socket'
import {connect} from 'react-redux'
import {sendUser, sendMe} from '../store/game'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




class CreateUser extends React.Component {
  constructor() {
    super()
    this.state = {
      handle: '',
      answered: false,
      score: 0,
      open: true,
      roomErrormessage:'',
      error:false,

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleChange(event) {
    this.setState({
      handle: event.target.value,
      error:false
    })

  }

  handleSubmit(event) {
    event.preventDefault()
    const usersArray = this.props.users.map(currentUser=>{
      return currentUser.handle
    })

    if(usersArray.includes(this.state.handle)){
      this.setState({
          roomErrormessage:'Name Already In Use',
          error:true
        })
    }else {
      socket.emit('userToSocket', this.state.handle, this.props.roomNum)

    const user = JSON.stringify(this.state);
    localStorage.setItem('user', user);
    this.props.sendUser(this.state, this.props.roomNum)
    this.props.sendMe(this.state)
    this.setState({
      handle: '',
      isDrawing: false,
      score: 0,
      word: '',
      open:false,
    })
    }
    //Sending name to socket to create a Key:Value

  }
handleClickOpen = () => {
    this.setState({open:true})
  };
handleClose = () => {
    this.setState({open:false})
  };


  render() {
    const {handle} = this.state
    return (

      <div>
      <Dialog open={this.state.open} onClose={this.handleClose}/**/aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create User Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <img src="https://media0.giphy.com/media/fnuSiwXMTV3zmYDf6k/giphy.gif" alt='Slow down there cowboy it seems like you dont have a name yet. Lets get you situated. What is you name cowboy?'></img>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="UserName"
            type="email"
            fullWidth
            value={handle}
            onChange={this.handleChange}
            error={this.state.error}
            helperText={this.state.roomErrormessage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSubmit} color="primary">
            create user
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }
}

const mapState = (state) => {
  return {
    users: state.game.users
  }
}

const mapDispatch = dispatch => {
  return {
  sendUser: (user, room) => dispatch(sendUser(user, room)),
  sendMe: (me) => dispatch(sendMe(me)),
  }
}

export default connect(mapState, mapDispatch)(CreateUser)
