import React from 'react'
import {connect} from 'react-redux'
import {sendUser} from '../store/game'

//const exists = JSON.parse(localStorage.getItem('user') || '{}');

class CreateUser extends React.Component {
  constructor() {
    super()
    this.state = {
      handle: '',
      isDrawing: false,
      score: 0,
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
    this.setState({
      handle: '',
      isDrawing: false,
      score: 0
    })
  }
  render() {
    const {handle} = this.state
    console.log(this.props.roomNum)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <h2>
          <label htmlFor='username'>Create Username:</label>
        </h2>
          <input type='text' name='username' value={handle} onChange={this.handleChange}/>
        <button type="submit" >Create</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
   sendUser: (user, room) => dispatch(sendUser(user, room))
  }
}

export default connect(null, mapDispatch)(CreateUser)
