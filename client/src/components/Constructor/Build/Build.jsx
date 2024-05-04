import styles from "../Constructor.module.css";
import {useState} from "react";


const Build = ({onChange}) =>{
    const [build, setBuild] = useState("maven")
    const setBuildFunction = (e) =>{
        setBuild(e.target.value)
        onChange(e.target.value);
    }


    return(
        <div className={styles.choice}>
            <p className={styles.head}>Choose building</p>
            <div className={styles.items}>
                <div className={styles.item}>
                    <input id="maven" type="radio"
                           name="build" value="maven"
                           checked={build === "maven"}
                           onChange={setBuildFunction}/>
                    <label htmlFor="maven">Maven</label>
                </div>
                <div className={styles.item}>
                    <input id="graddle" type="radio"
                           name="build" value="graddle"
                           checked={build === 'graddle'}
                           onChange={setBuildFunction}/>
                    <label htmlFor="graddle">Graddle</label>
                </div>
            </div>
        </div>
    )

}

export default Build