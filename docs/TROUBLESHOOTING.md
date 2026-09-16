# Troubleshooting

- **`memory content is required`**: pass non-empty content after `add`.
- **No search results**: ensure `--project` is the same between participating agents, or provide the same `--file`.
- **Store cannot be written**: choose a writable `--file`; the program never silently falls back to a remote service.
- **Offline audit fails**: remove the reported prohibited transport from runtime/configuration code. Documentation may discuss prohibited mechanisms, but runtime cannot implement them.
- **LM Studio adapter unavailable**: this repository intentionally waits for an audited SDK. Follow `WINDOWS_SETUP.md`; do not invent SDK methods.
