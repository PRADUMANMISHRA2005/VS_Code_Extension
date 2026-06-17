import * as vscode from 'vscode';
import { createProject } from './commands/createProject';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand(
        'project-wizard.createProject',
        createProject
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}