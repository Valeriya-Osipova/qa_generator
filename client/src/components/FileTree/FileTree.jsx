import styles from './FileTree.module.css'
import Folders from "./Folders/Folders";
import explorer from "./folderData";
// import {GET} from "../../api/archive/route";
const FileTree = () =>{
    return(
        <div className={styles.container}>
            <div className={styles.subHeader}>File tree</div>
            <div className={styles.folders}><Folders explorer={explorer}/></div>
            <button /*onClick={()=> GET()}*/>Download</button>
        </div>
    )
}

export default FileTree