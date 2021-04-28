import React from 'react'
import {connect} from 'react-redux';
import {sendScore, sendWord} from '../store/game'
import {randomWord} from './gameFunctions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class Winner extends React.Component {
  constructor(props){
    super(props);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      open: true,
    }
    // this.handleClose = this.handleClose.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleClose = () => {
    this.setState({open:false})
  };

  handleReset(){
    this.props.users.forEach(user => {
      let score = {
        handle: user.handle,
        score: -user.score
      }
      this.props.sendScore(score, this.props.roomNum);
    })
    const word = randomWord();
    this.props.sendWord(word, this.props.roomNum);
  }

  render(){
    const {me, users} = this.props;
    const winner = users.filter(user => {
      return user.score > 5000
    });

    return me.score > 5000
    ? (
      <Dialog open={this.state.open} onClose={this.handleClose}/**/aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Good Game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <img src="https://media4.giphy.com/media/cOtvwSHKaFK3Ul1VVu/giphy.gif?cid=ecf05e479h4tk9gxovhm9gsbp39j242r9d9nj30ayq1lcq57&rid=giphy.gif" alt='you won'></img>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleReset} color="primary">
            new Game?
          </Button>
        </DialogActions>
      </Dialog>
    ) : (
      <Dialog open={this.state.open} onClose={this.handleClose}/**/aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">You lost, {winner[0].handle} won</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <img src="https://media4.giphy.com/media/L8a5NHroNWv6nP1YxR/giphy.gif?cid=ecf05e47ondrkskuwjm8av99ornsax33det1l9btijfm5ydd&rid=giphy.gif" alt='you lost'></img>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapState = state => {
  return {
    me: state.game.me,
    users: state.game.users
  }
}

const mapDispatch = dispatch => {
  return {
    sendScore: (score, room) => dispatch(sendScore(score, room)),
    sendWord: (word, room) => dispatch(sendWord(word, room))
  }
}

export default connect(mapState, mapDispatch)(Winner);
