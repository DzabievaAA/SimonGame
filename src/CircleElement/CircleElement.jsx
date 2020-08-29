import React, {useState, useRef} from 'react';
import styles from './CircleElement.module.css';

function CircleElement ({color, onClick, transform})  {
    

    return <div>
    <div onClick={onClick} className={styles.circle}  style={{backgroundColor: color, transform: transform}} >
    </div>
    
    </div>
}

export default CircleElement;