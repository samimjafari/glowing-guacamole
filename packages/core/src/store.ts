import { cp, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { MemoryRecord } from "./types.js";
export interface MemoryStore { load(): Promise<MemoryRecord[]>; save(records: MemoryRecord[]): Promise<void>; backup(destination: string): Promise<void>; restore(source: string): Promise<void>; health(): Promise<{ ok: boolean; path: string; count: number }>; }
export class JsonFileMemoryStore implements MemoryStore {
  constructor(public readonly path: string) {}
  async load(): Promise<MemoryRecord[]> { try { const value = JSON.parse(await readFile(this.path, "utf8")); if (!Array.isArray(value)) throw new Error("memory file root must be an array"); return value; } catch (error: unknown) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; } }
  async save(records: MemoryRecord[]): Promise<void> { await mkdir(dirname(this.path), { recursive: true }); const temporary = `${this.path}.tmp`; await writeFile(temporary, `${JSON.stringify(records, null, 2)}\n`, "utf8"); await rename(temporary, this.path); }
  async backup(destination: string): Promise<void> { await mkdir(dirname(destination), { recursive: true }); await this.load(); await cp(this.path, destination); }
  async restore(source: string): Promise<void> { const parsed = JSON.parse(await readFile(source, "utf8")); if (!Array.isArray(parsed)) throw new Error("backup is not a memory array"); await this.save(parsed); }
  async health(): Promise<{ ok: boolean; path: string; count: number }> { const records = await this.load(); return { ok: true, path: this.path, count: records.length }; }
}
