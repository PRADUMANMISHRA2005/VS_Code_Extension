import * as vscode from "vscode";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function analyzeComplexity() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("No file is open!");
    return;
  }

  const config = vscode.workspace.getConfiguration("projectWizard");
  const apiKey = config.get<string>("geminiApiKey");
  if (!apiKey) {
    vscode.window.showErrorMessage(
      "Please set your Gemini API key in Settings → projectWizard.geminiApiKey",
    );
    return;
  }

  const code = editor.document.getText();
  const language = editor.document.languageId;

  vscode.window.showInformationMessage("Analyzing complexity...");

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
    const prompt = `
You are an expert software engineer. Analyze the time and space complexity of this ${language} code.

For each function:
1. Function name
2. Time complexity (Big-O)
3. Space complexity (Big-O)
4. One line explanation why

Finally give the overall complexity.

Code:
\`\`\`${language}
${code}
\`\`\`
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    showResultPanel(text);
  } catch (err: any) {
    vscode.window.showErrorMessage("Gemini Error: " + err.message);
  }
}

function showResultPanel(result: string) {
  const panel = vscode.window.createWebviewPanel(
    "complexityResult",
    "⏱ Complexity Analysis",
    vscode.ViewColumn.Beside,
    {},
  );

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
      </style>
    </head>
    <body>
      <h2>⏱ Complexity Analysis</h2>
      <pre>${result}</pre>
    </body>
    </html>
  `;
}
