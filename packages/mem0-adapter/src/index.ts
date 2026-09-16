export const MEM0_LOCAL_STATUS = "UNPROVEN" as const;
export interface Mem0CapabilityReport { status: typeof MEM0_LOCAL_STATUS; reason: string; }
export function mem0Capability(): Mem0CapabilityReport { return { status: MEM0_LOCAL_STATUS, reason: "No Mem0 package or fully local embedding/LLM configuration was installed or executed in this repository; the core engine remains independent." }; }
