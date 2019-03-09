import * as vscode from "vscode";

export class Executor {
    public static runInTerminal(command: string, terminal: string = "Screen"): void {
        if (this.terminals[terminal] === undefined) {
            const term = vscode.window.createTerminal(terminal)
            this.terminals[terminal] = term
        }
        this.terminals[terminal].show()
        this.terminals[terminal].sendText(command)

        setTimeout(() => {
            vscode.commands.executeCommand("workbench.action.focusActiveEditorGroup")
        }, 100)
    }

    public static sendCommand(command: string) {
        let spawn = require("child_process").spawn
        let quote = `${command}`

        let cmd = spawn("wk-screen", ["-c", quote])

        cmd.stdout.on("data", data => {
            process.stdout.write(data);
        });

        cmd.stderr.on("data", data => {
            process.stderr.write(data);
        });

        cmd.on("exit", code => {
            // tslint:disable-next-line:no-console
            console.error(code)
        });
    }

    public static onDidCloseTerminal(closedTerminal: vscode.Terminal): void {
        delete this.terminals[closedTerminal.name]
    }

    private static terminals: { [id: string]: vscode.Terminal } = {}
}