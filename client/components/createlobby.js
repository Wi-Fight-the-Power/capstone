import React from 'react'
import Game from './game'
import {Button} from '@material-ui/core'


class CreateLobby extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    const randomnumber = Math.floor(100000 + Math.random() * 900000);
    event.preventDefault()
    this.props.history.push({pathname: `/game/${randomnumber}`})
  }
  render(){
    return(
      <div>
        <Button color="primary" id="create lobby" variant="contained" onClick={this.handleSubmit} >Create Lobby</Button>
      </div>
    )
  }
}


export default CreateLobby
