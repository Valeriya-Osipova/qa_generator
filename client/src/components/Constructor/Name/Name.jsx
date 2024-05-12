import styles from "./Name.module.css";
import { useState } from "react";

const Name = ({ onChange }) => {
  const [name, setName] = useState("");
  const setNameFunction = (e) => {
    setName(e.target.value);
    onChange(e.target.value);
    console.log(name);
  };

  return (
    <div className={styles.container}>
      <p className={styles.name}>Name:</p>
      <input type="text" maxLength="20" onChange={setNameFunction} />
    </div>
  );
};
export default Name;
