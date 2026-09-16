# Limitations

- The LM Studio SDK is absent, so no native plugin, preprocessor, tool provider, packaging, lifecycle, cancellation, or GUI behavior is verified.
- Automatic assistant-response capture and PredictionLoop are unproven and not implemented.
- Storage is atomic JSON, not SQLite; no encryption, locking, vector embeddings, BM25 benchmark, or migration engine exists.
- Mem0 and LangChain are isolated capability reports only.
- Windows, Kali, Termux, and VS Code have no target-environment verification. Generic Linux tests are not evidence for those targets.
- The stdio dispatcher has malformed-message handling but no host-managed restart/backpressure/cancellation implementation.
