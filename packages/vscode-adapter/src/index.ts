import type { MemoryEngine } from "../../core/src/engine.js";
export interface VsCodeWorkspaceMemory { projectId: string; root: string; }
export async function workspaceDiagnostics(engine: MemoryEngine, workspace: VsCodeWorkspaceMemory) { return { integration: "CLI/stdio contract", projectId: workspace.projectId, storage: await engine.health(), count: await engine.count({ projectId: workspace.projectId }) }; }
