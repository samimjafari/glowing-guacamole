import type { MemoryInput, MemoryFilter, SearchOptions } from "./types.js";
export type MemoryCommand = "memory.add" | "memory.search" | "memory.get" | "memory.update" | "memory.delete" | "memory.list" | "memory.clear" | "memory.export" | "memory.import" | "memory.stats" | "memory.health";
export interface ProtocolRequest { id: string; type: MemoryCommand; payload?: { input?: MemoryInput; id?: string; patch?: Partial<MemoryInput>; query?: string; filter?: MemoryFilter; options?: SearchOptions; records?: unknown; mode?: "merge" | "replace"; }; }
export interface ProtocolResponse { id: string; ok: boolean; result?: unknown; error?: { code: string; message: string }; }
