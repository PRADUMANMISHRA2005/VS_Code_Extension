import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

import { ProjectConfig } from "../types/projectTypes";

import { reactFolders } from "../templates/reactTemplate";
import { nextFolders } from "../templates/nextTemplate";
import { expressFolders } from "../templates/expressTemplate";
import { cpFolders } from "../templates/cpTemplate";
import { snippetMap } from "../templates/cpSnippets";
import { snippetCodes } from "../templates/snippetCodes";

import {
  cppMain,
  cppTemplate,
  javaMain,
  javaTemplate,
} from "../templates/cpLanguageTemplates";

export async function generateProject(config: ProjectConfig) {
  const workspace = vscode.workspace.workspaceFolders;

  if (!workspace) {
    vscode.window.showErrorMessage("Open a folder first!");
    return;
  }

  const root = workspace[0].uri.fsPath;
  const projectPath = path.join(root, config.name);

  if (fs.existsSync(projectPath)) {
    vscode.window.showErrorMessage(`Project "${config.name}" already exists.`);
    return;
  }

  fs.mkdirSync(projectPath, {
    recursive: true,
  });

  function createFolders(folders: string[]) {
    folders.forEach((folder) => {
      fs.mkdirSync(path.join(projectPath, folder), {
        recursive: true,
      });
    });
  }

  /*
   * COMPETITIVE PROGRAMMING
   */

  if (config.projectMode === "Competitive Programming") {
    createFolders(cpFolders);

    const lang: "cpp" | "java" = config.language === "Java" ? "java" : "cpp";

    const extension = lang === "java" ? ".java" : ".cpp";

    config.cpSnippets?.forEach((snippet) => {
      const key = snippetMap[snippet as keyof typeof snippetMap];

      const code = snippetCodes[lang][key as keyof typeof snippetCodes.cpp];

      if (code) {
        fs.writeFileSync(
          path.join(projectPath, "snippets", key + extension),
          code,
        );
      }
    });

    fs.writeFileSync(path.join(projectPath, "input.txt"), "");

    fs.writeFileSync(path.join(projectPath, "output.txt"), "");

    fs.writeFileSync(
      path.join(projectPath, "README.md"),
      `# Competitive Programming Starter

Generated using Project Wizard 🚀

Files:
- input.txt
- output.txt
- templates/
- snippets/

For local testing:

C++
    // freopen("input.txt", "r", stdin);
    // freopen("output.txt", "w", stdout);

Java
    // System.setIn(new FileInputStream("input.txt"));
    // System.setOut(new PrintStream("output.txt"));
`,
    );

    if (config.language === "C++") {
      fs.writeFileSync(path.join(projectPath, "main.cpp"), cppMain);

      fs.writeFileSync(
        path.join(projectPath, "templates", "template.cpp"),
        cppTemplate,
      );
    }

    if (config.language === "Java") {
      fs.writeFileSync(path.join(projectPath, "Main.java"), javaMain);

      fs.writeFileSync(
        path.join(projectPath, "templates", "Template.java"),
        javaTemplate,
      );
    }
  } else {

  /*
   * WEB PROJECTS
   */
    if (config.frontend === "React") {
      createFolders(reactFolders);
    }

    if (config.frontend === "Next.js") {
      createFolders(nextFolders);
    }

    if (config.backend === "Express") {
      createFolders(expressFolders);
    }

    /*
     * DATABASES
     */

    if (config.database === "MongoDB") {
      fs.mkdirSync(path.join(projectPath, "server", "src", "models"), {
        recursive: true,
      });

      fs.writeFileSync(path.join(projectPath, ".env"), "");

      fs.writeFileSync(path.join(projectPath, ".env.example"), "");
    }

    if (config.database === "PostgreSQL") {
      fs.mkdirSync(path.join(projectPath, "server", "migrations"), {
        recursive: true,
      });

      fs.writeFileSync(path.join(projectPath, ".env"), "");

      fs.writeFileSync(path.join(projectPath, ".env.example"), "");
    }

    if (config.database === "MySQL") {
      fs.writeFileSync(path.join(projectPath, ".env"), "");

      fs.writeFileSync(path.join(projectPath, ".env.example"), "");
    }

    /*
     * EXTRAS
     */

    if (config.extras.includes("TypeScript")) {
      fs.writeFileSync(
        path.join(projectPath, "tsconfig.json"),
        `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true
  }
}`,
      );
    }

    if (config.extras.includes("Docker")) {
      fs.writeFileSync(
        path.join(projectPath, "Dockerfile"),
        `FROM node:20

WORKDIR /app

COPY . .

CMD ["npm", "start"]
`,
      );

      fs.writeFileSync(
        path.join(projectPath, "docker-compose.yml"),
        `services:
  app:
    build: .
    ports:
      - "3000:3000"
`,
      );
    }

    if (config.extras.includes("Git Init")) {
      fs.writeFileSync(
        path.join(projectPath, ".gitignore"),
        `node_modules
.env
dist
out
`,
      );
    }

    if (config.extras.includes("ESLint")) {
      fs.writeFileSync(path.join(projectPath, ".eslintrc"), "");
    }

    if (config.extras.includes("Prettier")) {
      fs.writeFileSync(path.join(projectPath, ".prettierrc"), "");
    }

    if (config.extras.includes("README")) {
      fs.writeFileSync(
        path.join(projectPath, "README.md"),
        `# ${config.name}

Generated using Project Wizard 🚀
`,
      );
    }
  }

  const choice = await vscode.window.showInformationMessage(
    `${config.name} created successfully 🚀`,
    "Open Project",
  );

  if (choice) {
    vscode.commands.executeCommand(
      "vscode.openFolder",
      vscode.Uri.file(projectPath),
    );
  }
}
