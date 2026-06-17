import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export async function generateProject(
    type: string,
    projectName: string
) {
    const workspace = vscode.workspace.workspaceFolders;

    if (!workspace) {
        vscode.window.showErrorMessage(
            'Open a folder first!'
        );
        return;
    }

    const root = workspace[0].uri.fsPath;
    const projectPath = path.join(root, projectName);

    fs.mkdirSync(projectPath, { recursive: true });

    let folders: string[] = [];

    switch (type) {
        case 'React':
            folders = [
                'src',
                'src/components',
                'src/pages',
                'src/hooks',
                'src/services',
                'src/utils',
                'src/assets',
                'public'
            ];
            break;

        case 'MERN':
            folders = [
                'client',
                'client/src',
                'server',
                'server/controllers',
                'server/models',
                'server/routes',
                'server/middleware'
            ];
            break;

        case 'C++':
            folders = [
                'src',
                'include',
                'build',
                'test'
            ];
            break;
    }

    folders.forEach(folder => {
        fs.mkdirSync(
            path.join(projectPath, folder),
            { recursive: true }
        );
    });

    vscode.window.showInformationMessage(
        `${projectName} created successfully 🚀`
    );
}