export const MEMORY_SCOPES = ["GLOBAL", "PROJECT", "SESSION"] as const;
export const MEMORY_TYPES = ["FACT", "PREFERENCE", "PROJECT", "NOTE", "INSTRUCTION", "RELATIONSHIP", "CONTEXT", "DECISION", "TASK", "TODO", "ARCHITECTURE"] as const;
export type MemoryScope = (typeof MEMORY_SCOPES)[number];
export type MemoryType = (typeof MEMORY_TYPES)[number];
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
export interface MemoryRecord {
  id: string; content: string; type: MemoryType; scope: MemoryScope; userId?: string; projectId?: string; sessionId?: string;
  source: string; confidence: number; createdAt: string; updatedAt: string; lastAccessedAt?: string; tags: string[]; metadata: Record<string, JsonValue>;
}
export interface MemoryInput { content: string; type?: MemoryType; scope?: MemoryScope; userId?: string; projectId?: string; sessionId?: string; source?: string; confidence?: number; tags?: string[]; metadata?: Record<string, JsonValue>; }
export interface MemoryFilter { scope?: MemoryScope; projectId?: string; sessionId?: string; userId?: string; type?: MemoryType; tags?: string[]; }
export interface SearchOptions extends MemoryFilter { limit?: number; minScore?: number; now?: Date; }
export interface SearchResult { record: MemoryRecord; score: number; reasons: string[]; }
export interface MemoryStats { count: number; byScope: Record<MemoryScope, number>; byType: Partial<Record<MemoryType, number>>; }
