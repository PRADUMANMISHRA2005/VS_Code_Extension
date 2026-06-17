import * as vscode from 'vscode';
import { generateProject } from '../services/folderGenerator';

export async function createProject() {
    const projectType = await vscode.window.showQuickPick(
        ['React', 'MERN', 'C++'],
        {
            placeHolder: 'Select Project Type'
        }
    );

    if (!projectType) {
        return;
    }

    const projectName = await vscode.window.showInputBox({
        prompt: 'Enter Project Name'
    });

    if (!projectName) {
        return;
    }

    await generateProject(projectType, projectName);
}