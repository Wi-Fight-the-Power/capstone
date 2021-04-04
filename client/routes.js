import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Chatbox from './components/chatbox'
import Lobby from './components/lobby'
import Game from './components/game'
import CreateUser from './components/createUser'
import Homepage from './components/homepage'
import Createlobby from './components/createlobby'
import AboutUs from './components/aboutUs'
import Instructions from './components/instructions'



class Routes extends Component {

  render() {

    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/chatbox" component={Chatbox} />
        <Route path="/game/:id" component={Game} />
        <Route path="/lobby" component={Lobby} />
        <Route path="/createlobby" component={Createlobby} />
        <Route path='/createuser' component={CreateUser} />
        <Route path='/aboutus' component={AboutUs} />
        <Route path='/instructions' component={Instructions} />
      </Switch>
    )
  }
}


export default Routes


