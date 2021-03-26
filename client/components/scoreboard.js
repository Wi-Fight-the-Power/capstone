import React, {Component} from 'react';
import {connect} from 'react-redux';

let USER = null;
if (localStorage.getItem('user') !== null){
  USER = JSON.parse(localStorage.getItem('user')).handle
} else {
  USER = 'Default'
}

class Scoreboard extends Component {
  constructor(){
    super();
    this.state = {
      handle: USER
    }
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
  console.log(localStorage.getItem('user'))
  return {
    users: state.game.users,
  }
}


export default connect(mapState)(Scoreboard);
