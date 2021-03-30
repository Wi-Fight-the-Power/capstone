import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';

const Homepage = () => (
  <div className='allthingscenter'>
    <div className='allthingscenter'>
      <img src='https://media.tenor.com/images/cdda4d937ceb893c7c6ce3963d55f4b2/tenor.gif'></img>
      <h2 className='roboto'>Ignore problems  in your life with Sketchi</h2>
      <p className='roboto'>
        HomeWork Due Tomorrow? Sketchi
        <br/>
        Global Pandemic? Sketchi
        <br/>
        Inlaws Coming Over? Sketchi
      </p>
      <h2 className='roboto'>
        Sketchi is a online multiplayer pictionary game.
      </h2>
    </div>
    <Link to="/lobby">
      <Button
      size="large"
      variant="contained"
      color="primary" >
          Start
        </Button>
    </Link>
    <p className='disclaimer'>-We are not responsible for any freinds losted during or after a game of Sketchi-</p>
  </div>
)

export default Homepage
