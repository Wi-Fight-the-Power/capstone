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
import socket from '../socket';




class CreateUser extends React.Component {
  constructor() {
    super()
    this.state = {
      handle: '',
      isDrawing: false,
      score: 0,
      open: false,
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
      handle: event.target.value
    })

  }

  handleSubmit(event) {
    event.preventDefault()
    
    //Sending name to socket to create a Key:Value
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
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={this.handleClickOpen} onClose={this.handleClose}/**/aria-labelledby="form-dialog-title">
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
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button> */}
          <Button onClick={this.handleSubmit} color="primary">
            create user
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }
}



const mapDispatch = dispatch => {
  return {
  sendUser: (user, room) => dispatch(sendUser(user, room)),
  sendMe: (me) => dispatch(sendMe(me)),
  }
}

export default connect(null, mapDispatch)(CreateUser)



