# Agent Guide

## Goal and boundaries
This repository builds **Local AI Memory Fabric**: a reusable shared persistent-memory library for local AI consumers. The core is framework independent; LM Studio, VS Code, CLI, and execution environments are optional adapters.

**Runtime is local-only.** Do not add network transports, model endpoints, cloud services, telemetry, API credentials, `fetch`, HTTP clients, sockets, WebSockets, or a loopback bridge. Allowed communication is in-process calls, filesystem storage, and child-process stdin/stdout. Never add import `try/catch` wrappers.

## Layout
- `packages/core`: record model, JSON local persistence, ranking, context construction, identity, protocol.
- `packages/process-bridge`: newline-delimited JSON stdin/stdout dispatcher.
- `packages/lmstudio-adapter`: SDK-independent logic only until the installed SDK is audited.
- `packages/environments`: allowlisted local execution abstractions.
- `packages/cli`: local-memory command line consumer.
- `tests`: Node test suite.
- `docs`: evidence, setup and limitations. Treat evidence classifications strictly: A current primary evidence, B practical implementation evidence, C unproven, D rejected.

## Conventions
Use strict TypeScript, ESM imports with `.js` suffixes, deterministic errors, bounded output, and explicit scope/project filters. Never log memory content as diagnostics. Keep core free of optional framework dependencies and platform branches. File writes must remain atomic.

## Commands
- `npm run build`
- `npm test`
- `npm run test:offline`
- `npm run memory -- doctor`

## Release
Run all commands above; inspect `git diff --check` and `git status`; update test matrix/limitations/evidence docs; commit the change; create the PR. Do not mark an LM Studio GUI, Windows, Kali, Termux, or VS Code test as verified unless it ran in that real target environment.
