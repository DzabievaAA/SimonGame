import React, {useState, useRef}from 'react';
import CircleElement from '../CircleElement/CircleElement';
import styles from '../CircleElement/CircleElement.module.css';
import Score from '../Score/Score';

function Game() {
    let [sequenceArray, setSequenceArray] = useState ([]);
    let randomIntForCircle = 0;
    let [transforms, setTransforms] = useState ([1, 1, 1, 1]);
    let [animationPlaying, setAnimationPlaying] = useState(false);
    let [score, setScore] = useState(0);

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
    
  return (
    <div className="Game">
      {["Red", "Green", "Blue", "Orange"].map((ColorName, index)=>{
        return <CircleElement  transform={`scale(${transforms[index]}, ${transforms[index]})`} onClick={() =>{
          if(!animationPlaying){
            playAnimationForCircle(index)
          }
         }
         } color={ColorName}/>
      })}
      <button onClick={()=>{
        addElementToSequence(4)
        playSequence() }}>start game</button>
      <Score text={score}/>
    </div>
  );
}

export default Game;