import React from 'react'
import {connect} from 'react-redux'
import {sendUser, sendMe} from '../store/game'
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core'


class CreateUser extends React.Component {
  constructor() {
    super()
    this.state = {
      handle: '',
      isDrawing: false,
      score: 0
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

  render() {
    const {handle} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <h2>
        <Textfield required id="standard-required" label="required" defaultValue="Enter Username Here"/>
          <label htmlFor='username'>Create Username:</label>
        </h2>
          <input type='text' name='username' value={handle} onChange={this.handleChange}/>
        <Button type="submit" color="primary" variant="contained" >Create</Button>
        </form>
        <Link to='/lobby'>
        <Button color="secondary" variant="contained">Back to Lobby</Button>
        </Link>
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
