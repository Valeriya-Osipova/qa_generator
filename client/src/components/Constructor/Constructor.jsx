import styles from "./Constructor.module.css";
import { useState } from "react";
import Framework from "./Framework/Framework";
import Build from "./Build/Build";
import Name from "./Name/Name";
import { dataLibrary } from "./LibraryPattern/libraryPatternData";
import { dataPattern } from "./LibraryPattern/libraryPatternData";
import LibraryPattern from "./LibraryPattern/LibraryPattern";
import explorerJava from "../FileTree/folderJava";

// const BASE_URL = "http://localhost:3030/files"
const Constructor = () => {
  const [language, setLanguage] = useState("java");
  const [build, setBuild] = useState("maven");
  const [nameJ, setNameJ] = useState("");
  const [nameP, setNameP] = useState("");
  const [frameworkJ, setFrameworkJ] = useState("");
  const [arrayLibJ, setArrayLibJ] = useState([]);
  const [arrayPatJ, setArrayPatJ] = useState([]);
  const [frameworkP, setFrameworkP] = useState("");
  const [arrayLibP, setArrayLibP] = useState([]);
  const [arrayPatP, setArrayPatP] = useState([]);
  const [isLangChanged, setIsLangChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const settings = {
    language: "",
    building: "",
    name: "",
    framework: "",
    libraries: [],
    patterns: [],
  };

  const setLanguageFunction = (e) => {
    setLanguage(e.target.value);
    setIsLangChanged(true);
  };

  const setBuildFunction = (build) => {
    setBuild(build);
  };

  const setNameFunction_J = (nameJ) => {
    setNameJ(nameJ);
  };

  const setNameFunction_P = (nameP) => {
    setNameP(nameP);
  };

  const setFrameworkFunction_J = (frameworkJ) => {
    setFrameworkJ(frameworkJ);
  };

  const setArrayFunctionLibrary_J = (arrayLibJ) => {
    setArrayLibJ(arrayLibJ);
    setIsLangChanged(false);
  };

  const setArrayFunctionPattern_J = (arrayPatJ) => {
    setArrayPatJ(arrayPatJ);
    setIsLangChanged(false);
  };

  const setFrameworkFunction_P = (frameworkP) => {
    setFrameworkP(frameworkP);
  };

  const setArrayFunctionLibrary_P = (arrayLibP) => {
    setArrayLibP(arrayLibP);
    setIsLangChanged(false);
  };

  const setArrayFunctionPattern_P = (arrayPatP) => {
    setArrayPatP(arrayPatP);
    setIsLangChanged(false);
  };

  const submitAction = (e) => {
    e.preventDefault();
    if (language === "java") {
      settings.language = language;
      settings.building = build;
      settings.name = nameJ;
      settings.framework = frameworkJ;
      settings.libraries = arrayLibJ;
      settings.patterns = arrayPatJ;
    } else if (language === "python") {
      settings.language = language;
      settings.building = "pip";
      settings.name = nameP;
      settings.framework = frameworkP;
      settings.libraries = arrayLibP;
      settings.patterns = arrayPatP;
    }
    console.log(settings);
    setIsLoading(true);

    fetch("http://localhost:3001/update-files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    })
      .then((result) => {
        const explorer = result.json();
        console.log(explorer);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className={styles.constructor}>
      <div className={styles.subHeader}>Constructor</div>
      <form id="form" onSubmit={submitAction} className={styles.form}>
        <div>
          <div className={styles.choice}>
            <p className={styles.head}>Language of project</p>
            <div className={styles.items}>
              <div className={styles.item}>
                <input
                  id="java"
                  type="radio"
                  name="language"
                  value="java"
                  checked={language === "java"}
                  onChange={setLanguageFunction}
                />
                <label htmlFor="java">Java</label>
              </div>
              <div className={styles.item}>
                <input
                  id="python"
                  type="radio"
                  name="language"
                  value="python"
                  checked={language === "python"}
                  onChange={setLanguageFunction}
                />
                <label htmlFor="python">Python</label>
              </div>
            </div>
          </div>
          {language === "java" ? (
            <div>
              <Build onChange={setBuildFunction} />
              <Name onChange={setNameFunction_J} />
              <Framework
                frameworks={{
                  fw1: "junit",
                  titleFw1: "JUnit",
                  fw2: "testng",
                  titleFw2: "TestNG",
                }}
                onChange={setFrameworkFunction_J}
              />
              <LibraryPattern
                sendArray={setArrayFunctionLibrary_J}
                isLangChanged={isLangChanged}
                data={dataLibrary.java}
                header={{ header: "Add library" }}
              />
              <LibraryPattern
                sendArray={setArrayFunctionPattern_J}
                isLangChanged={isLangChanged}
                data={dataPattern.java}
                header={{ header: "Add pattern" }}
              />
            </div>
          ) : (
            <div>
              <Name onChange={setNameFunction_P} />
              <Framework
                frameworks={{
                  fw1: "unittest",
                  titleFw1: "unittest",
                  fw2: "pytest",
                  titleFw2: "pytest",
                }}
                onChange={setFrameworkFunction_P}
              />
              <LibraryPattern
                sendArray={setArrayFunctionLibrary_P}
                isLangChanged={isLangChanged}
                data={dataLibrary.python}
                header={{ header: "Add library" }}
              />
              <LibraryPattern
                sendArray={setArrayFunctionPattern_P}
                isLangChanged={isLangChanged}
                data={dataPattern.python}
                header={{ header: "Add pattern" }}
              />
            </div>
          )}
        </div>
        <div className={styles.button_container}>
          <button type="submit">Generate</button>
        </div>
        {isLoading ? (
          <div className={styles.loader_container}>
            <div className={styles.loader}></div>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Constructor;
