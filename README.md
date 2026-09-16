# Local AI Memory Fabric

A local-only, reusable TypeScript library that gives CLI agents and future native adapters a shared persistent project-memory layer. It uses local JSON files, in-process calls, and optionally newline-delimited JSON over a spawned process's stdin/stdout. It does not implement a network bridge or model endpoint.

## What is operational in this repository

- Typed memory records with global, project, and session scopes.
- Atomic local-file persistence; search/ranking; deterministic prompt-context construction.
- CLI commands for adding, searching, listing, exporting, importing, backup/restore, statistics and diagnostics.
- A local stdio protocol suitable for an IDE or local agent child process.
- Strictly allowlisted local execution abstractions.

## Quick start

```bash
npm install
npm test
npm run memory -- init
npm run memory -- add --type DECISION "Use local-only shared memory"
npm run memory -- search "shared memory"
npm run memory -- doctor
```

The default store is a file under the current user's home directory, namespaced by a hashed canonical project root. Use `--file` to select an explicit local file or `--project` for a stable shared namespace.

## Evidence status

The memory core is VM-tested. The LM Studio native plugin is **UNPROVEN** because the SDK is not installed and this Linux VM cannot run the Windows LM Studio GUI. No claim is made that a model invoked a tool or that assistant outputs are automatically captured. See [docs/LIMITATIONS.md](docs/LIMITATIONS.md), [docs/LM_STUDIO_SDK_AUDIT.md](docs/LM_STUDIO_SDK_AUDIT.md), and [docs/WINDOWS_SETUP.md](docs/WINDOWS_SETUP.md).

## Design

See [ARCHITECTURE.md](ARCHITECTURE.md), [docs/OFFLINE_SECURITY.md](docs/OFFLINE_SECURITY.md), and [AGENTS.md](AGENTS.md). The legacy Electron UI remains a static migration artifact and deliberately does not download or run a model.
