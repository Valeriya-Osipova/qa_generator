import Constructor from "./components/Constructor/Constructor";
import FileTree from "./components/FileTree/FileTree";
import styles from './App.module.css'

function App() {
  return (
      <div className="App">
          <h1 className={styles.header}><span className={styles.qa}>QA</span> project builder</h1>
          <div className={styles.container}>
              <FileTree/>
              <Constructor/>
          </div>
      </div>
  );
}

export default App;
