import * as vscode from "vscode";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";

export async function analyzeComplexity() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("No file is open!");
    return;
  }

  const config = vscode.workspace.getConfiguration("projectWizard");
  const apiKey = config.get<string>("geminiApiKey");
  if (!apiKey) {
    showApiSetupGuide();
    return;
  }

  function showApiSetupGuide() {
    const panel = vscode.window.createWebviewPanel(
      "apiSetupGuide",
      "🚀 Project Wizard Setup",
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
      },
    );

    panel.webview.html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 25px;
        color: white;
        background: #1e1e1e;
        line-height: 1.8;
      }

      h1 {
        color: #4da6ff;
      }

      .step {
        margin: 15px 0;
        padding: 12px;
        border-left: 4px solid #4da6ff;
        background: #252526;
      }

      button {
        background: #007acc;
        color: white;
        border: none;
        padding: 10px 18px;
        border-radius: 6px;
        cursor: pointer;
        margin-right: 10px;
      }

      button:hover {
        background: #0098ff;
      }

      code {
        background: #333;
        padding: 4px 8px;
        border-radius: 4px;
      }
    </style>
  </head>

  <body>
    <h1>🚀 Welcome to Project Wizard</h1>

<p style="
  background:#252526;
  padding:12px;
  border-left:4px solid #4da6ff;
  border-radius:4px;
">
  ⚠ You only need to do this once.
  Your Gemini API key will be saved in VS Code settings and you won't have to enter it again.
</p>

<h2>Gemini API Key Required</h2>

    <div class="step">
      <b>Step 1:</b><br>
      Create a Gemini API Key.
      <br><br>
      <button onclick="openStudio()">
        Open AI Studio
      </button>
    </div>

    <div class="step">
      <b>Step 2:</b><br>
      Copy your Gemini API Key.
    </div>

    <div class="step">
      <b>Step 3:</b><br>
      Open VS Code Settings.
      <br><br>
      <button onclick="openSettings()">
        Open Settings
      </button>
    </div>

    <div class="step">
      <b>Step 4:</b><br>
      Search:
      <br>
      <code>projectWizard.geminiApiKey</code>
    </div>

    <div class="step">
      <b>Step 5:</b><br>
      Paste your API Key.
    </div>

    <div class="step">
      <b>Step 6:</b><br>
      Run Complexity Analysis again.
    </div>

    <script>
      const vscode = acquireVsCodeApi();

      function openStudio() {
        vscode.postMessage({ command: "openStudio" });
      }

      function openSettings() {
        vscode.postMessage({ command: "openSettings" });
      }
    </script>
  </body>
  </html>
  `;

    panel.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
        case "openStudio":
          vscode.env.openExternal(
            vscode.Uri.parse("https://aistudio.google.com/app/apikey"),
          );
          break;

        case "openSettings":
          vscode.commands.executeCommand(
            "workbench.action.openSettings",
            "projectWizard.geminiApiKey",
          );
          break;
      }
    });
  }

  const code = editor.document.getText();
  const language = editor.document.languageId;

  const lineCount = editor.document.lineCount;

  if (lineCount > 1000) {
    const choice = await vscode.window.showWarningMessage(
      `This file contains ${lineCount} lines. Analysis may be slower and less accurate.`,
      "Analyze Anyway",
      "Cancel",
    );

    if (choice !== "Analyze Anyway") {
      return;
    }
  }
  if (!code.trim()) {
    vscode.window.showErrorMessage(
      "Current file is empty. Please write some code first.",
    );
    return;
  }

  vscode.window.showInformationMessage("Analyzing complexity...");

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });
    const prompt = `
You are an expert software engineer.

Analyze this ${language} code and return ONLY markdown.

# Function Analysis

For each function create a row in this table:

| Function | Time Complexity | Space Complexity | Reason |
|----------|----------------|-----------------|---------|

Then provide:

# Overall Complexity

| Metric | Complexity |
|---------|------------|
| Time Complexity | ... |
| Space Complexity | ... |

Rules:
- Use Big-O notation.
- Keep explanations short.
- Return markdown only.
- Do not include introductions like "As an expert software engineer...".

Code:
\`\`\`${language}
${code}
\`\`\`
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    showResultPanel(text, language);
  } catch (err: any) {
    console.error("FULL GEMINI ERROR:", err);

    const errorMessage = err?.message || "";

    if (errorMessage.includes("429")) {
      vscode.window.showErrorMessage(
        "⚠ Gemini API quota exceeded. Please wait a few minutes or use another Gemini API key.",
      );
      return;
    }

    if (
      errorMessage.includes("API_KEY_INVALID") ||
      errorMessage.includes("invalid")
    ) {
      vscode.window.showErrorMessage(
        "⚠ Invalid Gemini API key. Please check your API key in VS Code Settings.",
      );
      return;
    }

    vscode.window.showErrorMessage(errorMessage);
  }
}

function showResultPanel(result: string, language: string) {
  let displayLanguage = language;

  if (language === "cpp") displayLanguage = "C++";
  if (language === "javascript") displayLanguage = "JavaScript";
  if (language === "typescript") displayLanguage = "TypeScript";
  if (language === "python") displayLanguage = "Python";
  if (language === "java") displayLanguage = "Java";
  const panel = vscode.window.createWebviewPanel(
    "complexityResult",
    "⏱ Complexity Analysis",
    vscode.ViewColumn.Beside,
    {},
  );

  const htmlContent = marked(result);

  panel.webview.html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: var(--vscode-font-family);
          padding: 20px;
          color: var(--vscode-editor-foreground);
          background: var(--vscode-editor-background);
          line-height: 1.6;
        }
        h2 { color: var(--vscode-textLink-foreground); }
        pre {
          background: var(--vscode-textBlockQuote-background);
          padding: 12px;
          border-radius: 6px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
          .result {
  line-height: 1.7;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 15px;
}

th, td {
  border: 1px solid #444;
  padding: 10px;
}

th {
  background: #2d2d2d;
}

code {
  background: #2d2d2d;
  padding: 2px 6px;
  border-radius: 4px;
}
  .language-badge {
  display: inline-block;
  margin-bottom: 15px;
  padding: 8px 14px;
  background: #2d2d2d;
  border-radius: 20px;
  font-weight: bold;
  color: #4da6ff;
}
      </style>
    </head>
    <body>
      <h2>⏱ Complexity Analysis</h2>

<div class="language-badge">
  Language: ${displayLanguage}
</div>
      <div class="result">
  ${htmlContent}
</div>
    </body>
    </html>
  `;
}
