import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

class HomePage extends React.Component {
  componentDidMount() {
    // user information
  }
  render() {
    return (
      <div>
        <h1>User Avatar</h1>
        <h2>Options to Edit/Update their avatar below</h2>
        <h4>Edit Background</h4>
        <h4>Edit Head/Face</h4>
        <h4>Edit Body</h4>
        <h2>Username</h2>
        <NavLink to="/createlobby">Create Lobby</NavLink>
        <NavLink to="/joinlobby">Join Lobby</NavLink>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    // User Information
    getUser: dispatch()
  }
}

export default connect(mapState, mapDispatch)(HomePage)
