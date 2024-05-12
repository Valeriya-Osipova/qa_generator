import styles from "./LibraryPattern.module.css";
import { ReactComponent as Plus } from "../../../assets/icons/plus.svg";
import { ReactComponent as Minus } from "../../../assets/icons/minus.svg";
import { ReactComponent as Check } from "../../../assets/icons/check.svg";
import { useState } from "react";

const LibraryPattern = ({ isLangChanged, sendArray, data, header }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [array, setArray] = useState([]);

  const addElement = (id) => {
    let element = data[id - 1];
    if (array.includes(element.name)) {
      let index = array.indexOf(element.name);
      array.splice(index, 1);
    } else array.push(element.name);
    sendArray(array);
    setIsSelected(!isSelected);
    console.log(array);
    element.isSelected = !element.isSelected;
  };

  const renderNames = () => {
    if (isLangChanged === true) {
      for (let i = 0; i <= array.length; i++) {
        let index = array.indexOf(i);
        array.splice(index, 1);
      }
    } else {
      return array.map((element, key) => (
        <span className={styles.library} key={key}>
          {element}{" "}
        </span>
      ));
    }
  };

  return (
    <div>
      <div className={styles.choice} onClick={() => setIsOpened(true)}>
        <p className={styles.head}>{header.header}</p>
        {isOpened ? <Minus /> : <Plus />}
      </div>
      {isOpened ? (
        <div className={styles.modal} onClick={() => setIsOpened(false)}>
          <div
            className={styles.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>{header.header}</div>
            <div>
              {data.length
                ? data.map((data) => (
                    <div
                      key={data.id}
                      className={
                        data.isSelected ? styles.field_active : styles.field
                      }
                      onClick={() => addElement(data.id)}
                    >
                      <div>
                        <div className={styles.title}>{data.name}</div>
                        <div className={styles.description}>
                          {data.description}
                        </div>
                      </div>
                      <div onChange={addElement}>
                        {data.isSelected ? <Check /> : <Plus />}
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div onChange={addElement} className={styles.libraries}>
        {renderNames()}
      </div>
    </div>
  );
};

export default LibraryPattern;
