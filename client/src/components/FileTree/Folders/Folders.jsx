import { useState } from "react";
import {ReactComponent as AngleDown} from '../../../assets/icons/angle-down-small.svg'
import {ReactComponent as AngleRight} from '../../../assets/icons/angle-right-small.svg'
import styles from './Folders.module.css'
const Folders = ({explorer}) =>{
    const [isOpened, setIsOpened] = useState(true);
    return(
        <div>
            <span className={styles.field} onClick={() => setIsOpened(!isOpened)}>
                <span style={{paddingRight: 5}}>{explorer.items.length !== 0 && (isOpened? <AngleDown/> : <AngleRight/> )} </span>
                <span style={{paddingRight: 5}}> {explorer.isFolder? '📁' : '📃'} </span>
                <span> {explorer.name} </span>
            </span>
            <br/>
            <div style={{display: isOpened ? "block" : "none", paddingLeft: 15}}>
                {explorer.items.map((explore) => (
                    <Folders key={explore.name} explorer={explore}/>
                ))}
            </div>
        </div>
    )
}

export default Folders