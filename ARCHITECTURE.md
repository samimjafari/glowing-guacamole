# Architecture

```
CLI agents / future LM Studio native plugin / future VS Code extension
                             |
                    local protocol contract
                             |
         MemoryEngine — retrieval — context construction
                             |
                 atomic JSON local-file store
```

The core does not know about LM Studio, LangChain, Mem0, Electron, or operating-system commands. Project identity derives from a canonical local root hashed with SHA-256; raw roots are not emitted by diagnostics. Records are isolated by explicit scope and project ID.

`JsonFileMemoryStore` is the current selected storage because it has no native dependency, can be atomically replaced, and runs under Node on Windows and Linux. It is not SQLite. SQLite/LanceDB/Chroma have not been benchmarked in this repository and are deliberately not claimed as implemented.

A separate process can use the newline-delimited JSON protocol in `packages/process-bridge`; it has IDs, structured errors, size validation, UTF-8 text streams, and stderr separation by convention. A supervising host restart policy is not yet implemented, so workers are optional and not used by the CLI.
