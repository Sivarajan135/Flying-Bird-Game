import React, {useEffect , useState} from 'react'
import styles from './Game.module.css'
import birdImage from '../Icons/dove-solid.svg'
import GameEnding from '../GameEnd/GameEnding'


function Game() {

  const gameHeight = 500
  const birdHeight = 35 
  const gameWidth = 600
  const obstacleGap = 150


  const [birdPosition , setBirdPosition] = useState(230)
  const [startGame , setStartGame] = useState(false)
  const [score , setScore] = useState(0);
  const [upObstacle , setUpObstacle] = useState(100);
  const [obstaclePosition , setObstaclePosition] = useState(0)
  const [display , setDisplay] = useState("none")

  useEffect(() => {
     if(startGame && birdPosition < gameHeight-birdHeight)
     {
        const interval = setInterval(() => {
            setBirdPosition(birdPosition => birdPosition+4);
        }, 20)
        

        return () => clearInterval(interval);
        
     }
  } ,[startGame , birdPosition])

  const generateRandom = num => {
     return Math.random()*num;
  }

  useEffect(() => {

    if(startGame && obstaclePosition < gameWidth)
    {
       const interval = setInterval(() => {
           setObstaclePosition(obstaclePosition => obstaclePosition + 4)
       }, 18)

       return () => clearInterval(interval)
    }
    else
    {
      if(startGame)
      {
      setObstaclePosition(0)
      setUpObstacle(Math.floor(generateRandom(2) * obstacleGap))
      if(obstaclePosition > (gameWidth - 50))
      {
        setScore(score => score + 1);
      }
      }
    }

 } ,[startGame , obstaclePosition])

    const upObstacleCollide = birdPosition < upObstacle
    const downObstacleCollide = birdPosition > (upObstacle+obstacleGap-birdHeight)


 useEffect(() => {

    if(obstaclePosition > 435 && (upObstacleCollide || downObstacleCollide))
    {
       setStartGame(false);
       setObstaclePosition(obstaclePosition)
       setDisplay("")
    }
 } , [ startGame , obstaclePosition])
 

    
  const upArrow = () => {
    if(birdPosition > birdHeight && birdPosition < gameHeight - birdHeight && startGame)
    {
    setBirdPosition(birdPosition-50);
    }
  }

  const getValue  = (item , bird , obs , newScore) => {
     setDisplay(item)
     setBirdPosition(bird)
     setObstaclePosition(obs)
     setScore(newScore)
  }

  return (
    <div>
        <div className={styles.mainContainer}>
            <img src={birdImage} style={{position :"absolute",width : "35px" , height : "35px" , top : `${birdPosition}px` ,left : 50}}></img>
            <div style={{width : "80px" , height : `${upObstacle}px` , backgroundColor :"rgba(0, 0, 0, 0.5)", position: "absolute" , right: `${obstaclePosition}px`, top: 0}}></div>
            <div style={{width : "80px" , height : `${gameHeight-obstacleGap-upObstacle}px` , backgroundColor :"rgba(0, 0, 0, 0.5)", position: "absolute" , right: `${obstaclePosition}px`, top : upObstacle + obstacleGap}}></div>
        </div>
        <button className={styles.startButton} onClick={() => setStartGame(true)}>Start Game</button>
        <button className={styles.scoreButton}>Score - {score}</button>
        <button onClick = {upArrow}className={styles.upButton}>Up</button><br /><br /><br /><br />

        <div className={styles.gameEnd} style = {{display : display}}><GameEnding score = {score} getValue = {getValue}/></div>
    </div>
  )
}

export default Game
