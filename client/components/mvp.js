import React from 'react'
import Chatbox from './chatbox'
const Mvp = () => {
  return (
    <div className="drawinggame">
      <iframe
        src="http://localhost:8080/w"
        title="plz wOrK"
        width="500px"
        height="500px"
      />
      <Chatbox />
    </div>
  )
}

export default Mvp
