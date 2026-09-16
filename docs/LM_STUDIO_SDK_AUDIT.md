# LM Studio SDK Audit — 2026-09-16

## Result: C / UNPROVEN

`node_modules/@lmstudio/sdk` was absent during the audit. Therefore no SDK version, package metadata, `.d.ts`, source declaration, plugin manifest, or exact signature could be inspected. The required identifiers (`PluginContext`, Prompt Preprocessor controller, Tools Provider controller, Tool, Chat, ChatMessage, LLM, generator handle, PredictionLoop, processing controllers, result types) and candidate methods (`tokenSource`, `pullHistory`, `createContentBlock`, `createStatus`, `setSenderName`, `guardAbort`, `abortSignal`, `pipeFrom`, `appendText`, `appendToolRequest`, `appendToolResult`, `model.respond`, `model.act`) are **not asserted to exist**.

An attempted current-web research request was blocked by an authentication failure (HTTP 401) in this environment; it is not evidence of SDK behavior. No substitute blog/API signature was used.

## Implemented boundary
`packages/lmstudio-adapter` contains only SDK-independent prompt augmentation and local memory-tool business logic. It intentionally does not import the SDK or register a plugin. This prevents invented signatures.

## Required primary-evidence procedure
1. On the target machine, install the official SDK through LM Studio's documented plugin workflow.
2. record exact package version and package metadata;
3. copy relevant declaration signatures and plugin manifest requirements into this file;
4. create a minimal registration-only plugin and test it in LM Studio Desktop GUI;
5. separately test prompt preprocessing marker, tool visibility/invocation/cancellation, persistence after restart, retrieval context, then an isolated PredictionLoop plugin;
6. change only the evidence entries actually demonstrated by GUI tests to A/B.

`PREDICTION_LOOP_STATUS = UNPROVEN`. Automatic assistant-response capture is also **UNPROVEN** and is not implemented.
