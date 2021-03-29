import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux'
import {sendUser, sendMe} from '../store/game'

class CreateUserName extends React.Component {
  constructor() {
    super()
    this.state = {
      handle: '',
      isDrawing: false,
      score: 0,
      word: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      handle: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const user = JSON.stringify(this.state);
    localStorage.setItem('user', user);
    this.props.sendUser(this.state, this.props.roomNum)
    this.props.sendMe(this.state)
    this.setState({
      handle: '',
      isDrawing: false,
      score: 0,
      word: ''
    })
  }
  //where material ui starts

  render(){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Woah slow down there. It seems like you dont have a username set up yet! Let's get you situated. What do you want your name to be?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button> */}
          <Button onClick={handleClose} color="primary">
            Create User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }
}

const mapDispatch = dispatch => {
  return {
  sendUser: (user, room) => dispatch(sendUser(user, room)),
  sendMe: (me) => dispatch(sendMe(me)),
  }
}


export default connect(null, mapDispatch)(CreateUserName)
