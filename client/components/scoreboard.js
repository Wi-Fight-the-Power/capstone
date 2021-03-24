import React, {Component} from 'react';
import {connect} from 'react-redux';



class Scoreboard extends Component {
  constructor(){
    super();
    this.state = {
      handle: 'john'
    }
  }



  render(){
    const info = this.props.score || [];

     return (
    <div id='scoreboard'>
      <h2>Scoreboard</h2>
      <div id='scorewindow'>
        <div id='output'>
          {info.map((object, i) => {
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
    score: state.chatbox.score,
  }
}


export default connect(mapState)(Scoreboard);
