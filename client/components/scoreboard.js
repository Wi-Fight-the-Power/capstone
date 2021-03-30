import React, {Component} from 'react';
import {connect} from 'react-redux';





class Scoreboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      handle: this.props.me ? this.props.me.handle : 'john',
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
  return {
    users: state.game.users,
    me: state.game.me
  }
}


export default connect(mapState)(Scoreboard);
