import { spawn } from "node:child_process"; import { relative, resolve } from "node:path";
export interface ExecutionRequest { command: string; args?: string[]; cwd: string; timeoutMs?: number; }
export interface ExecutionResult { code: number | null; stdout: string; stderr: string; timedOut: boolean; }
export interface ExecutionEnvironment { id: string; platform: string; execute(request: ExecutionRequest): Promise<ExecutionResult>; }
const MAX_OUTPUT = 200_000;
export class LocalExecutionEnvironment implements ExecutionEnvironment {
 constructor(public readonly id: string, public readonly platform: string, private readonly allowedCommands: readonly string[]) {}
 async execute(request: ExecutionRequest): Promise<ExecutionResult> { if (!this.allowedCommands.includes(request.command)) throw new Error(`Command is not allowed: ${request.command}`); const root = resolve(request.cwd); if (relative(root, resolve(request.cwd)).startsWith("..")) throw new Error("cwd escapes workspace"); return new Promise((resolveResult, reject) => { const child = spawn(request.command, request.args ?? [], { cwd: root, shell: false, windowsHide: true, env: { PATH: process.env.PATH ?? "", NO_COLOR: "1" } }); let stdout = "", stderr = "", done = false; const finish = (result: ExecutionResult) => { if (!done) { done = true; resolveResult(result); } }; child.stdout.on("data", (chunk) => { stdout = (stdout + chunk).slice(-MAX_OUTPUT); }); child.stderr.on("data", (chunk) => { stderr = (stderr + chunk).slice(-MAX_OUTPUT); }); child.on("error", reject); child.on("close", (code) => finish({ code, stdout, stderr, timedOut: false })); const timer = setTimeout(() => { child.kill(); finish({ code: null, stdout, stderr, timedOut: true }); }, Math.min(request.timeoutMs ?? 30_000, 120_000)); child.once("close", () => clearTimeout(timer)); }); }
}
export class WindowsExecutionEnvironment extends LocalExecutionEnvironment { constructor() { super("windows", "win32", ["cmd.exe", "powershell.exe", "pwsh.exe", "node", "npm", "git"]); } }
export class LinuxExecutionEnvironment extends LocalExecutionEnvironment { constructor() { super("linux", "linux", ["sh", "bash", "node", "npm", "git", "python3"]); } }
export class KaliExecutionEnvironment extends LinuxExecutionEnvironment { override readonly id = "kali"; }
export class TermuxExecutionEnvironment extends LinuxExecutionEnvironment { override readonly id = "termux"; }
