import React from 'react'
import {Paper, Typography} from '@material-ui/core'
import Card from '@material-ui/core/card'

export default function AboutUs () {
  return (
    <Paper className='aboutUs'>
    <Typography variant='h6'>About Us</Typography>
      <div>
        <Card>
        <h2>Jeremy Cook</h2>
        <div id='aboutImage'>Image</div>
        <h3>Github Link/Socials</h3>
        <p>Something about Jeremy</p>
        </Card>
        <Card>
        <h2>Shawn Gay</h2>
        <div id='aboutImage'>Image</div>
        <h3>Github Link/Socials</h3>
        <p>Something about Shawn</p>
        </Card>
        <Card>
        <h2>William Guan</h2>
        <div id='aboutImage'>Image</div>
        <h3>Github Link/Socials</h3>
        <p>Something about William G</p>
        </Card>
        <Card>
        <h2>William Watson</h2>
        <div id='aboutImage'>Image</div>
        <h3>Github Link/Socials</h3>
        <p>Something about William W</p>
        </Card>
      </div>
  </Paper>
  )
}
