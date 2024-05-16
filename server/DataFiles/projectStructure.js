const explorerJava = {
  name: "projectJavaMaven",
  isFolder: true,
  items: [
    {
      name: ".idea",
      isFolder: true,
      items: [
        {
          name: ".gitignore",
          isFolder: false,
          items: [],
        },
        {
          name: "compiler.xml",
          isFolder: false,
          items: [],
        },
        {
          name: "encodinds.xml",
          isFolder: false,
          items: [],
        },
        {
          name: "jarRepositories.xml",
          isFolder: false,
          items: [],
        },
        {
          name: "misc.xml",
          isFolder: false,
          items: [],
        },
        {
          name: "uiDesigner.xml",
          isFolder: false,
          items: [],
        },
        {
          name: "workspace.xml",
          isFolder: false,
          items: [],
        },
      ],
    },
    {
      name: "src",
      isFolder: true,
      items: [
        {
          name: "main",
          isFolder: true,
          items: [
            {
              name: "java",
              isFolder: true,
              items: [
                {
                  name: "org",
                  isFolder: true,
                  items: [
                    {
                      name: "example",
                      isFolder: true,
                      items: [
                        {
                          name: "pages",
                          isFolder: true,
                          items: [
                            {
                              name: "Main.java",
                              isFolder: false,
                              items: [],
                            },
                          ],
                        },
                        {
                          name: "patterns",
                          isFolder: true,
                          items: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "resources",
              isFolder: true,
              items: [],
            },
          ],
        },
        {
          name: "test",
          isFolder: true,
          items: [
            {
              name: "java",
              isFolder: true,
              items: [
                {
                  name: "org.examlpe",
                  isFolder: true,
                  items: [
                    {
                      name: "test.java",
                      isFolder: false,
                      items: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: ".gitignore",
      isFolder: false,
      items: [],
    },
    {
      name: "pom.xml",
      isFolder: false,
      items: [],
    },
    {
      name: "testng.xml",
      isFolder: false,
      items: [],
    },
  ],
};

const explorerPython = {
  name: "projectPython",
  isFolder: true,
  items: [
    {
      name: ".idea",
      isFolder: true,
      items: [
        {
          name: "inspectionProfiles",
          isFolder: true,
          items: [
            {
              name: "profiles_settings.xml",
              isFolder: false,
              items: [],
            },
          ],
        },
        {
          name: ".gitignore",
          isFolder: false,
          items: [],
        },
        {
          name: "misc.xml",
          isFolder: false,
          items: [],
        },
        {
          name: "modules.xml",
          isFolder: false,
          items: [],
        },
        {
          name: "pythonProject.xml",
          isFolder: false,
          items: [],
        },
        {
          name: "workspace.xml",
          isFolder: false,
          items: [],
        },
      ],
    },
    {
      name: ".idea",
      isFolder: true,
      items: [
        {
          name: "Lib",
          isFolder: true,
          items: [],
        },
        {
          name: "Scripts",
          isFolder: true,
          items: [],
        },
        {
          name: ".gitignore",
          isFolder: false,
          items: [],
        },
        {
          name: "pyvenv.cfg",
          isFolder: false,
          items: [],
        },
      ],
    },
    {
      name: "POM",
      isFolder: true,
      items: [
        {
          name: "LoginPage.py",
          isFolder: false,
          items: [],
        },
      ],
    },
    {
      name: "tests",
      isFolder: true,
      items: [
        {
          name: "test.py",
          isFolder: false,
          items: [],
        },
      ],
    },
  ],
};

module.exports = { explorerJava, explorerPython };
