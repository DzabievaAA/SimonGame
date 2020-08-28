import React, {useState, useRef}from 'react';
import CircleElement from '../CircleElement/CircleElement';
import styles from '../CircleElement/CircleElement.module.css';

function Game() {
    const refRedCircle = useRef(null)
    const refGreenCircle = useRef(null);
    const refBlueCircle = useRef(null);
    const refOrangeCircle = useRef(null);
    let sequenceArray = []

    let arrSize = 4;
    let randomIntForCircle = 0;

    function addElementToSequence(arrSize) {
     randomIntForCircle = Math.floor(Math.random() * Math.floor(arrSize));
     console.log( randomIntForCircle );
        if (randomIntForCircle === 0) {
          sequenceArray.push(refRedCircle);
        }
        if (randomIntForCircle === 1) {
          sequenceArray.push(refGreenCircle);
       }
        if (randomIntForCircle === 2) {
          sequenceArray.push(refBlueCircle);
      }
        if (randomIntForCircle === 3) {
          sequenceArray.push(refOrangeCircle);
      }
    }

    function playSequence () {
      let promise = new Promise((resolve)=>{
        resolve();
      });
      for ( let element of sequenceArray ){
        promise = promise.then(()=> new Promise((resolve) => setTimeout(() =>{
                                                                element.current.click();
                                                                resolve() 
                                                              }, 200
                                                            )
                                                )
                              );
      }
    }
    
  return (
    <div className="Game">
      <CircleElement ref={refRedCircle} color={"Red"}/>
      <CircleElement ref={refGreenCircle} color={"Green"}/>
      <CircleElement ref={refBlueCircle} color={"Blue"}/>
      <CircleElement ref={refOrangeCircle} color={"Orange"}/>
      <button onClick={()=>{
        addElementToSequence(4)
        playSequence() }}>start game</button>
    </div>
  );
}

export default Game;