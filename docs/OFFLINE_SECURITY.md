# Offline and Security Model

## Runtime guarantee
The TypeScript runtime packages contain no HTTP client, socket, WebSocket, fetch, localhost bridge, model endpoint, telemetry, credential handling, or remote authentication. Communication is direct calls, local files, or stdin/stdout. `npm run test:offline` scans runtime/configuration sources for prohibited transport indicators; it is a guardrail, not a network-monitoring proof.

## Controls
- Input length is bounded for memory content and stdio messages.
- Memory files are atomically replaced and project identity is hashed.
- Context construction has a character budget and preserves the original user request.
- Execution uses `spawn` without a shell, a command allowlist, bounded timeout, restricted environment, and output cap.
- Diagnostics return counts/paths/status, not memory contents.
- No automatic command execution is exposed to an LM Studio model.

## Limits
JSON local files do not provide encryption, concurrent-writer locking, or SQLite transaction semantics. Use OS account/disk protection and keep the store location private. A future encrypted store must be local-only and independently audited.
