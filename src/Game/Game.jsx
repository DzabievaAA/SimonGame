import React, {useState, useRef}from 'react';
import CircleElement from '../CircleElement/CircleElement';
import styles from './game.module.css';
import Score from '../Score/Score';
import information from '../img/information.png'

function Game() {
    let [sequenceArray, setSequenceArray] = useState ([]);
    let randomIntForCircle = 0;
    let [transforms, setTransforms] = useState ([1, 1, 1, 1]);
    let [animationPlaying, setAnimationPlaying] = useState(false);
    let [score, setScore] = useState(0);
    let [correctAnswers, setCorrectAnswers] = useState(0);
    let [gameMoving, setGameMoving] = useState(true);
    let [gameMode, setGameMode] = useState("");



    let textButton = ' ';
    if(sequenceArray.length === 0) {
      textButton = 'start';
    } else {
      textButton = 'next Lvl';
    }

  let buttonVision;
  if(gameMoving === true) {
    buttonVision = 
    <div className={styles.wrap}>
      <button className={styles.button} onClick={()=>{
        setGameMode('')
        addElementToSequence(4)
        playSequence()
        setGameMoving(false); }}>
          {textButton}
      </button>
    </div>
  }
  else {
    buttonVision = null;
  }


    
    function addElementToSequence(arrSize) {
     randomIntForCircle = Math.floor(Math.random() * Math.floor(arrSize));
     sequenceArray.push(randomIntForCircle);
     setSequenceArray(sequenceArray)
    }

    function playSequence () {
      setAnimationPlaying(true);
      let promise = new Promise((resolve)=>{
        resolve();
      });
      for ( let index of sequenceArray ){
        promise = promise.then(()=> new Promise((resolve) => setTimeout(() =>{
                                                                playAnimationForCircle(index);
                                                                resolve() 
                                                              }, 200
                                                            )
                                                )
                              );
      }
      promise.then(()=>{setAnimationPlaying(false)});
      
    }
    
    function playAnimationForCircle (index) {
      let copyTransforms = [...transforms];
      copyTransforms[index] = 1.6;
      setTransforms(copyTransforms);
      setTimeout(()=> {
        let copyTransforms = [...transforms];
        copyTransforms[index] = 1;
        setTransforms(copyTransforms);
      }, 200 )
    }

    const [descriptionStyle, setDescriptionStyle] = React.useState( styles.description );

    function myFunction() {
      if (descriptionStyle === styles.description) {
        setDescriptionStyle(styles.description_hidden);
      } else {
        setDescriptionStyle(styles.description);
      }
    }  


  return (<div>
    <div href='' onClick={myFunction}>
      <img className={styles.infoButton} src={information} wigth='40' height='40' alt=""/>
    </div>
    <span className={descriptionStyle}>WELCOME TO SIMON GAME<br></br><br></br>
                                        The game creates a series of lights <br></br> 
                                        and requires a user to repeat the sequence.<br></br>
                                        If the user succeeds, the series <br></br>
                                         becomes progressively longer <br></br> and more complex.Once the user fails,<br></br>
                                         the game is over. 
                                         </span>
    <span className="Game">
      {["Red", "Green", "Blue", "Orange"].map((ColorName, index)=>{
        return <CircleElement  transform={`scale(${transforms[index]}, ${transforms[index]})`} 
        onClick={() =>{
          if(sequenceArray.length === 0) {
            //do nothing
            return;            
          }
          if(!animationPlaying){
            
            playAnimationForCircle(index)
      
            if (sequenceArray[correctAnswers] === index) {
              setCorrectAnswers(correctAnswers + 1);
              if (correctAnswers === sequenceArray.length -1){
                setGameMode("Level Completed");
                setScore(score + 1);
                setCorrectAnswers(0);
                setGameMoving(true);
              }
            } else {
              setGameMode("Game Over");
              setScore(0);
              setSequenceArray([]);
              setCorrectAnswers(0);
              setGameMoving(true);
            }
          }

         }
         } color={ColorName}/>
      })}
        {buttonVision}
      <div className={styles.score}>
        <Score  text={score}/>
      </div>
      <span>{gameMode}</span>
    </span>
    
    </div>
  );
}


export default Game;