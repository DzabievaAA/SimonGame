import React, {useState, useRef}from 'react';
import CircleElement from '../CircleElement/CircleElement';
import styles from '../CircleElement/CircleElement.module.css';

function Game() {
    const refToCircle = useRef(null);
    let arrayCircle = [];
    let arrSize = 3;
    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } 

    function checkArray(x){
        let retValue = false;
        for(var i=0; i<arrSize; i++){
            if(arrayCircle[i] === x){
                retValue = true;
                break;
            }
        }
        return retValue;
    }
debugger;
    for (let i = 0; i < arrSize; i++) {
        let valueCircle = getRandomInRange(1, 4)
        if(!checkArray(valueCircle)){ 
            arrayCircle.push(valueCircle); 
        }
        else{ 
            i--; 
        }
    }
    

  return (
    <div className="Game">
      <CircleElement color={"Red"}/>
      <CircleElement color={"Green"}/>
      <CircleElement color={"Blue"}/>
      <CircleElement color={"Orange"}/>
      <button>start game</button>
    </div>
  );
}

export default Game;