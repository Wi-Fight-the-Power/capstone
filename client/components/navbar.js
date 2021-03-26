import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => (
  <div className='navbar'>
    <h1 className='SKETCHI'>SKETCHI</h1>
    <nav>
      <Link to="/lobby">"Lobby.js"</Link>
    </nav>
  </div>
)

export default Navbar
