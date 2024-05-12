import styles from "../Constructor.module.css";
import { useState } from "react";

const Framework = ({ onChange, frameworks }) => {
  const [framework, setFramework] = useState("");
  const setFrameworkFunction = (e) => {
    setFramework(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={styles.choice}>
      <p className={styles.head}>Choose framework</p>
      <div className={styles.items}>
        <div className={styles.item}>
          <input
            id="junit"
            type="radio"
            name="framework"
            value={frameworks.fw1}
            checked={framework === frameworks.fw1}
            onChange={setFrameworkFunction}
          />
          <label htmlFor="junit">{frameworks.titleFw1}</label>
        </div>
        <div className={styles.item}>
          <input
            id="testng"
            type="radio"
            name="framework"
            value={frameworks.fw2}
            checked={framework === frameworks.fw2}
            onChange={setFrameworkFunction}
          />
          <label htmlFor="testng">{frameworks.titleFw2}</label>
        </div>
        <div className={styles.item}>
          <input
            id="none"
            type="radio"
            name="framework"
            value=""
            checked={framework === ""}
            onChange={setFrameworkFunction}
          />
          <label htmlFor="none">None</label>
        </div>
      </div>
    </div>
  );
};

export default Framework;
