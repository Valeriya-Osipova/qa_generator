import styles from "./FileTree.module.css";
import Folders from "./Folders/Folders";
import explorerJava from "./folderJava";
import explorerPython from "./folderPython";
// import {GET} from "../../api/archive/route";
const name = "Testing app";
const language = "java";

const downloadFile = () => {
  fetch("http://localhost:3001/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ language: language, name: name }),
  })
    .then((result) => {
      if (result.ok) {
        return result.blob();
      }
      throw new Error("Не удалось загрузить файл");
    })
    .then((blob) => {
      // Создаем URL для Blob объекта
      const url = window.URL.createObjectURL(blob);
      // Создаем временный <a> элемент для скачивания файла
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}.zip`; // Имя файла для скачивания
      document.body.appendChild(a); // Вставляем <a> в документ
      a.click(); // Имитируем клик по ссылке для начала скачивания
      window.URL.revokeObjectURL(url); // Освобождаем URL Blob объекта
      a.remove();
    })
    .catch((e) => console.error(e));
};

const FileTree = () => {
  return (
    <div className={styles.container}>
      <div className={styles.fileForm}>
        <div>
          <div className={styles.subHeader}>File tree</div>
          <div className={styles.folders}>
            <Folders explorer={explorerJava} />
          </div>
        </div>
        <div className={styles.button_container}>
          <button onClick={downloadFile}>Download</button>
        </div>
      </div>
    </div>
  );
};

export default FileTree;
