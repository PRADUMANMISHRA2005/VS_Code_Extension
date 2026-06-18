import * as vscode from "vscode";
import { generateProject } from "../services/folderGenerator";

export async function createProject() {
  const projectMode = await vscode.window.showQuickPick(
    ["Web", "Competitive Programming"],
    {
      placeHolder: "Select Project Mode",
    },
  );

  if (!projectMode) {
    return;
  }

  let frontend: string | undefined;
  let backend: string | undefined;
  let database: string | undefined;
  let language: string | undefined;
  let cpSnippets: string[] = [];
  let extras: string[] = [];

  if (projectMode === "Competitive Programming") {
    language = await vscode.window.showQuickPick(["C++", "Java"], {
      placeHolder: "Choose Primary Language",
    });

    if (!language) {
      return;
    }
    const selectedSnippets = await vscode.window.showQuickPick(
      [
        "Binary Search",
        "DSU",
        "Dijkstra",
        "Segment Tree",
        "Fenwick Tree",
        "Sieve",
        "Modular Exponentiation",
        "Modular Arithmetic",
        "KMP",
        "Z Function",
        "Trie",
        "Topological Sort",
      ],
      {
        canPickMany: true,
        placeHolder: "Choose snippets to include",
      },
    );

    if (selectedSnippets) {
      cpSnippets = selectedSnippets;
    }
  } else {
    frontend = await vscode.window.showQuickPick(["React", "Next.js", "None"], {
      placeHolder: "Choose Frontend",
    });

    if (!frontend) {
      return;
    }

    backend = await vscode.window.showQuickPick(["Express", "None"], {
      placeHolder: "Choose Backend",
    });

    if (!backend) {
      return;
    }

    database = await vscode.window.showQuickPick(
      ["MongoDB", "PostgreSQL", "MySQL", "None"],
      {
        placeHolder: "Choose Database",
      },
    );

    if (!database) {
      return;
    }

    const selectedExtras = await vscode.window.showQuickPick(
      [
        "TypeScript",
        "Tailwind",
        "Redux",
        "Socket.IO",
        "Docker",
        "ESLint",
        "Prettier",
        "Git Init",
        "README",
      ],
      {
        canPickMany: true,
        placeHolder: "Select Extras",
      },
    );

    if (selectedExtras) {
      extras = selectedExtras;
    }
  }

  const projectName = await vscode.window.showInputBox({
    prompt: "Enter Project Name",
  });

  if (!projectName) {
    return;
  }

  await generateProject({
    projectMode: projectMode as "Web" | "Competitive Programming",

    name: projectName,
    frontend,
    backend,
    database,
    extras,
    language,
    cpSnippets,
  });
}
