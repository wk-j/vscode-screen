"use strict";

import * as vscode from "vscode";
import { commands, ExtensionContext, languages, Range, TextDocument, Uri, window, workspace } from "vscode";
import { HttpCodeLensProvider } from "./HttpCodeLensProvider";
import { RequestController } from "./RequestController";
import { ScreenCompletion } from "./ScreenCompletion";

let requestController = new RequestController();

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand("screen-client.request",
            ((document: TextDocument, range: Range) => requestController.run(range))));
    context.subscriptions.push(languages.registerCodeLensProvider("screen", new HttpCodeLensProvider()));

    let selector: vscode.DocumentSelector = [{
        pattern: "**/*.screen"
    }];
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(selector, new ScreenCompletion(), ""));
}

export function deactivate() { }