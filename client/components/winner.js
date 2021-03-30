import React from 'react'
import {connect} from 'react-redux';
import {sendScore, sendWord} from '../store/game'
import {randomWord} from './gameFunctions';

class Winner extends React.Component {
  constructor(props){
    super(props);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset(){
    this.props.users.forEach(user => {
      let score = {
        handle: user.handle,
        score: -user.score
      }
      this.props.sendScore(score, this.props.roomNum);
    })
    this.props.sendWord(randomWord(), this.props.roomNum);
  }

  render(){
    const {me, users} = this.props;
    const winner = users.filter(user => {
      return user.score > 5000
    });

    return me.score > 5000
    ? (
      <div>
        <h2>YOU WIN!</h2>
        <button type='button' onClick={this.handleReset}>New Game?</button>
      </div>
    ) : (
      <div>
        <h2>{winner[0].handle} Wins!</h2>
      </div>
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
