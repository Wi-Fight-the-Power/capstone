import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';

const Homepage = () => (
  <div className='homepagemainDiv'>
    <div className='allthingscenter'>
      <img src='https://media.tenor.com/images/cdda4d937ceb893c7c6ce3963d55f4b2/tenor.gif'></img>
      <h2 className='Raleway'>Ignore problems in your life with Sketchi</h2>
      <p className='Raleway'>
        HomeWork Due Tomorrow? Sketchi
        <br/>
        Global Pandemic? Sketchi
        <br/>
        In-laws Coming Over? Sketchi
      </p>
      <h2 className='roboto'>
        Sketchi is an online multiplayer pictionary game.
      </h2>
      <Link to="/lobby">
      <Button
      size="large"
      variant="contained"
      color="primary"
      style={{backgroundColor : "#6930C3"}}  >
          Start
        </Button>
    </Link>
    <p className='disclaimer'>-We are not responsible for any friends lost during or after a game of Sketchi-</p>
    </div>

  </div>
)

export default Homepage
