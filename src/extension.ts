import * as vscode from "vscode";
import { createProject } from "./commands/createProject";
import { analyzeComplexity } from "./analyzers/complexityAnalyzer";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "project-wizard.createProject",
    createProject,
  );

  const complexityDisposable = vscode.commands.registerCommand(
    "project-wizard.analyzeComplexity",
    analyzeComplexity,
  );

  context.subscriptions.push(disposable, complexityDisposable);
}

export function deactivate() {}
