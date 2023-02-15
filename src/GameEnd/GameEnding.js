import React, { useState } from 'react'
import styles from './GameEnding.module.css'

function GameEnding(props) {

  const value = (e , bird , obs , newScore) => {
      props.getValue(e , bird , obs , newScore); 
  }

  return (
    <div>
      <h2>Oops...!! Game Over</h2>
      <div className={styles.buttonContainer}>
           <button className={styles.scoreBtn}>Score - {props.score}</button>
           <button className={styles.restartBtn} onClick = {() => value("none" , 230 , 0 , 0)}>Restart</button>
      </div>
    </div>
  )
}

export default GameEnding
