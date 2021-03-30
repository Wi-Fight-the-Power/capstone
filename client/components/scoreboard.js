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

  }

componentDidMount(){
  socket.emit('userJoined', this.props.roomNum);
  console.log('mountain lion')
}


  render(){
    const users = this.props.users || [];

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


export default connect(mapState)(Scoreboard);
