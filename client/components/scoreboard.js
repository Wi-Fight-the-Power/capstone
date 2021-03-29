import React, {Component} from 'react';
import {connect} from 'react-redux';
import socket from '../socket';





class Scoreboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      handle: this.props.me ? this.props.me.handle : 'john'
    }
    socket.on('userJoined', () => {
      socket.emit('sendingUserInfo', this.props.me, this.props.roomNum)
    })
    socket.on('recievingUserInfo', info => {
      console.log(info)
    })
  }

componentDidMount(){
  socket.emit('userJoined', this.props.roomNum);
}


  render(){
    const users = this.props.users || [];
    console.log(users, 'from the scoreboard')


     return (
    <div id='scoreboard'>
      <h2>Scoreboard</h2>
      <div id='scorewindow'>
        <div id='output'>
          {users.map((object, i) => {
            let handle = object.handle;
            let score = object.score;
            return <div key={i}>
                <span className={handle === this.state.handle
                  ? 'handleColor'
                  : 'handleColor-rec'
                  }>{`${handle}:`}</span>{score}
                </div>
          })}
        </div>
      </div>
    </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.game.users,
    me: state.game.me
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch()
  }
}


export default connect(mapState)(Scoreboard);
