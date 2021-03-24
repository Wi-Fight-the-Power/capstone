import React from 'react'
import Mvp from './mvp'


class CreateLobby extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    const randomnumber =Math.floor(100000 + Math.random() * 900000);
    event.preventDefault()
    this.props.history.push({pathname: `/mvp/${randomnumber}`})
  }
  render(){
    return(
      <div>
        <button type="submit" id="create lobby" onClick={this.handleSubmit} >Create Lobby</button>
      </div>
    )
  }
}


export default CreateLobby
