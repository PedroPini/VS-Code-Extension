// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "testextension" is now active!');
	const helloWorldCommand = vscode.commands.registerCommand('testextension.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from testextension!');
    });

	const createBoilerplateCommand = vscode.commands.registerCommand('testextension.createBoilerplate', async () => {
        if (!vscode.workspace.workspaceFolders) {
            return vscode.window.showErrorMessage('Please open a project folder first');
        }

		const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;

        const htmlContent = `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta http-equiv="X-UA-Compatible" content="ie=edge" />
				<title>Document</title>
				<link rel="stylesheet" href="app.css" />
			</head>
			<body>
				<script src="app.js"></script>
			</body>
			</html>`;
			fs.writeFile(path.join(folderPath, 'index.html'), htmlContent, err => {
				if (err) {
					return vscode.window.showErrorMessage('Failed to create boilerplate file!');
				}
				vscode.window.showInformationMessage('Created boilerplate files');
			});
		});

	context.subscriptions.push(helloWorldCommand, createBoilerplateCommand);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
