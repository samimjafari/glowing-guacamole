export const LANGCHAIN_STATUS = "UNPROVEN" as const;
export function langChainCapability() { return { status: LANGCHAIN_STATUS, reason: "LangChain is intentionally not a runtime dependency; core retrieval is local and dependency-free." }; }
