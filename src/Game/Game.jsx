import React, {useState, useRef}from 'react';
import CircleElement from '../CircleElement/CircleElement';
import styles from '../CircleElement/CircleElement.module.css';

function Game() {
    let [sequenceArray, setSequenceArray] = useState ([]);
    let randomIntForCircle = 0;
    let [transforms, setTransforms] = useState ([1, 1, 1, 1]);
    let [animationPlaying, setAnimationPlaying] = useState(false);

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
      <CircleElement  transform={`scale(${transforms[0]}, ${transforms[0]})`} onClick={() =>{
                                                                                              if(!animationPlaying){
                                                                                                playAnimationForCircle(0)
                                                                                              }
                                                                                             }
                                                                                      } color={"Red"}/>
      <CircleElement  transform={`scale(${transforms[1]}, ${transforms[1]})`} onClick={() => {
                                                                                              if(!animationPlaying){
                                                                                                playAnimationForCircle(1)
                                                                                              }
                                                                                             }} color={"Green"}/>
      <CircleElement  transform={`scale(${transforms[2]}, ${transforms[2]})`} onClick={() =>{
                                                                                              if(!animationPlaying){
                                                                                                playAnimationForCircle(2)
                                                                                              }
                                                                                             }} color={"Blue"}/>
      <CircleElement  transform={`scale(${transforms[3]}, ${transforms[3]})`} onClick={() =>{
                                                                                              if(!animationPlaying){
                                                                                                playAnimationForCircle(3)
                                                                                              }
                                                                                             }} color={"Orange"}/>
      <button onClick={()=>{
        addElementToSequence(4)
        playSequence() }}>start game</button>
    </div>
  );
}

export default Game;