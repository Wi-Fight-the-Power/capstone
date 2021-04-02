import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Playernotify from './components/playerleaving'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Playernotify/>
    </div>
  )
}

export default App
