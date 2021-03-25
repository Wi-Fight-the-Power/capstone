import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => (
  <div>
    <h1>BOILERMAKER</h1>
    <nav>
      <Link to="/lobby">"Lobby.js"</Link>
    </nav>
    <hr />
  </div>
)

export default Navbar
