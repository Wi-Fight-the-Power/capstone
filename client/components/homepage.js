import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      background: [],
      head: [],
      body: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.username]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.newUser(this.state)
  }
  render() {
    // Existing User will be based off of cookie/session/local storage
    const {username} = this.state
    return existingUser ? (
      <div>
        <h1>User Avatar</h1>
        <h2>Options to Edit/Update their avatar below</h2>
        <h4>Edit Background</h4>
        <h4>Edit Head/Face</h4>
        <h4>Edit Body</h4>
        <form onSubmit={this.handleSubmit}>
        <h2>
          <label htmlFor='username'>Edit Username: {username}</label>
          <input type='text' name='username' value={username} onChange={this.handleChange}/>
        </h2>
        </form>
        <h3>
        <NavLink to="/createlobby">Create Lobby</NavLink>
        <NavLink to="/joinlobby">Join Lobby</NavLink>
        </h3>
        <button type="submit">Confirm Changes</button>
      </div>
      ) : (
      <div>
        <h1>Choose Your Avatar!</h1>
        <h2>Options to Edit/Update their avatar below</h2>
        <h4>Choose Background</h4>
        <h4>Choose Head/Face</h4>
        <h4>Choose Body</h4>
        <form onSubmit={this.handleSubmit}>
        <h2>
          <label htmlFor='username'>Create Username:</label>
          <input type='text' name='username' value={username} onChange={this.handleChange}/>
        </h2>
        </form>
        <button type="submit">Create</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    newUser: state.newUser,
    existingUser: state.existingUser
  }
}

const mapDispatch = dispatch => {
  return {
    // User Information
    // getUser: dispatch()
  }
}

export default connect(mapState, mapDispatch)(HomePage)
