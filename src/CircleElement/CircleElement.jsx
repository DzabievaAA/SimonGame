import React, {useState, useRef} from 'react';
import styles from './CircleElement.module.css';

const CircleElement = React.forwardRef ( ({color}, ref ) => {
    
    let [transform, setTransform] = useState(1)
    function onClick (e) {
        setTransform(1.6);
        setTimeout(()=>{
            setTransform(1)
        }, 200)
    }
    return <div>
    <div onClick={onClick} ref={ref} id="circle" className={styles.circle}  style={{backgroundColor: color, transform: `scale(${transform}, ${transform})`}} >
    </div>
    
    </div>
})

export default CircleElement;