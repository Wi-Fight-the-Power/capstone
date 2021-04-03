import React from 'react';

const Instructions = () => {
  return (
    <div className='instructions'>
      <div className='instructions-header'>
        <h1>Instructions</h1>
      </div>
      <div className='instructions-inner'>
        <h3 className='inner-header'>Object</h3>
        <p>
        To accumulate more points than your friends/opponents.
        </p>
        <h3 className='inner-header'>Drawer</h3>
        <p>
        As the Drawer you are expected to illustrate to the best of your ability a word given to you at random. You start by pressing the start button. This will start timer and reveal to you your word. If you don't like your word you have the opportunity to be given a new word by pressing the refresh button. Be careful though! The timer will continue to decrement while you're deciding what word to draw! If all Guessers correctly guess what your picture representation is you will be awarded points for your efforts.
        </p>
        <h3 className='inner-header'>Guesser</h3>
        <p>
        As one of the Guessers the object is to guess the word thats being represented to you by the Drawer. The faster you guess the word the more points you'll accumulate as the points available to you will be decrementing aswell with the timer.
        </p>
        <h3 className='inner-header'>Rotation</h3>
        <p>
        As the timer hits zero, Drawer will rotate to each player over and over until the winning point value is reached.
        </p>
      </div>
    </div>
  )
}

export default Instructions;
