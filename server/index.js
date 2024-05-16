const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs-extra");

const app = express();
const PORT = 3001;

const {
  testngXml,
  pomStart,
  pomEnd,
  testngPom,
  seleniumPom,
  selenidePom,
  postgreSQLPom,
  apachePoiPom,
  apacheCommonsPom,
  allurePom,
  jdbcTemplatePom,
  PagePrimitiveData,
  ParallelPatternData,
  RandomDataData,
  testngParallelPattern,
} = require("./DataFiles/data");

const { zipDirectory } = require("./Controlls/zipControll");

const {
  explorerJava,
  explorerPython,
} = require("./DataFiles/projectStructure");

const libraryTexts = {
  JdbcTemplate: jdbcTemplatePom,
  Allure: allurePom,
  "Apache Commons": apacheCommonsPom,
  "Apache POI": apachePoiPom,
  PostgreSQL: postgreSQLPom,
  Selenide: selenidePom,
  Selenium: seleniumPom,
};

app.use(cors());
app.use(express.json());

const pathToPom = path.join(
  __dirname,
  "./projects/java/destination/demo/pom.xml"
);

app.post("/update-files", (req, res) => {
  if (fs.existsSync(path.join(__dirname, "./projects/java/destination/demo"))) {
    fs.rmSync(path.join(__dirname, "./projects/java/destination/demo"), {
      recursive: true,
    });
    console.log("Предыдущая версия проекта удалена");
  }
  const { language, building, name, framework, libraries, patterns } = req.body;

  if (language === "java" && building === "maven") {
    const project = path.join(__dirname, "./projects/java/Maven_basic");
    const destination = path.join(
      __dirname,
      "./projects/java/destination/demo"
    );
    console.log(destination);
    fs.copySync(project, destination, { recursive: true });
    if (framework !== "") {
      addFramework(framework);
    }
    libraries.length ? addLibraries(libraries) : "";
    patterns.length ? addPatterns(patterns) : "";
    res.status(200).send("Проект сформирован");
    res.send(explorerJava);
  } else {
    res.status(400).send("Проекты для данного языка еще в разработке");
  }
});

const addFramework = (framework) => {
  if (framework === "testng") {
    const pathToFile = path.join(
      __dirname,
      "./projects/java/destination/demo/testng.xml"
    );

    const data = `${pomStart} 
    ${testngPom}
    ${pomEnd}
    `;

    fs.writeFile(pathToFile, testngXml, (err) => {
      if (err) throw err;
      console.log("Добавлен файл!");
    });
    fs.writeFile(pathToPom, data, (err) => {
      if (err) throw err;
      console.log("Добавлен файл!");
    });
  } else console.log("Фрейморк не поддерживается");
};

const addLibraries = (libraries) => {
  let libsContetn = ``;

  libraries.forEach((library) => {
    if (libraryTexts[library]) {
      libsContetn += libraryTexts[library] + "\n";
    }
  });
  const data = `${pomStart} 
  ${libsContetn}
  ${pomEnd}`;

  fs.writeFile(pathToPom, data, (err) => {
    if (err) throw err;
    console.log("Файл pom.xml обновлен");
  });
};

const addPatterns = (patterns) => {
  const pathToProject = path.join(
    __dirname,
    "./projects/java/destination/demo/src/main/java/org/example/patterns"
  );
  const destinationPrimitive = path.join(pathToProject, "./PagePrimitive.java");
  const destinationParallel = path.join(
    pathToProject,
    "./ParallelPattern.java"
  );
  const destinationRandom = path.join(pathToProject, "./RandomData.java");
  const pathToTestng = path.join(
    __dirname,
    "./projects/java/destination/demo/testng.xml"
  );
  patterns.forEach((pattern) => {
    if (pattern === "PagePrimitive") {
      addLibraries(["Selenide"]);
      fs.writeFile(destinationPrimitive, PagePrimitiveData, (err) => {
        if (err) throw err;
        console.log("Паттерн добавлен");
      });
    }
    if (pattern === "ParallelPattern") {
      addLibraries(["Selenium"]);
      fs.writeFile(destinationParallel, ParallelPatternData, (err) => {
        if (err) throw err;
        console.log("Паттерн добавлен");
      });
      fs.writeFile(pathToTestng, testngParallelPattern, (err) => {
        if (err) throw err;
        console.log("Testng обновлен");
      });
    }
    if (pattern === "RandomData") {
      fs.writeFile(destinationRandom, RandomDataData, (err) => {
        if (err) throw err;
        console.log("Паттерн добавлен");
      });
    }
  });
};

app.post("/download", (req, res) => {
  const { language } = req.body;
  if (language === "java") {
    const demoDir = path.join(__dirname, "./projects/java/destination/demo");
    const demoZip = path.join(
      __dirname,
      "./projects/java/destination/demo.zip"
    );
    const mavenBasicDir = path.join(__dirname, "./projects/java/Maven_basic");
    const mavenBasicZip = path.join(
      __dirname,
      "./projects/java/Maven_basic.zip"
    );

    const zipAndSendFile = (srcDir, outZip) => {
      zipDirectory(srcDir, outZip, (err) => {
        if (err) {
          console.error("Error while zipping directory:", err);
          return res.status(500).send("Ошибка при создании архива");
        }
        res.download(outZip, "demo.zip", (err) => {
          if (err) {
            console.error("File download error:", err);
          } else {
            console.log("File successfully sent!");
          }
        });
      });
    };

    if (fs.existsSync(demoDir)) {
      zipAndSendFile(demoDir, demoZip);
    } else {
      zipAndSendFile(mavenBasicDir, mavenBasicZip);
    }
  } else {
    res.status(400).send("Проекты для данного языка еще в разработке");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
