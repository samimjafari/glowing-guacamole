# Windows Installation and LM Studio GUI Verification

## Install the library
In PowerShell, install a supported Node.js release, clone/copy this repository, then run:

```powershell
npm install
npm test
npm run test:offline
npm run memory -- init
npm run memory -- add --type PREFERENCE "User prefers Afghan Dari wording."
npm run memory -- search "Dari wording"
```

Use `--file C:\path\to\private-memory.json` if the default user-home location is unsuitable. Back it up with `npm run memory -- backup C:\safe\memory-backup.json`.

## Required LM Studio GUI protocol (not yet performed)
1. Install the official SDK/plugin tooling using LM Studio's current instructions; record the exact version in the SDK audit.
2. Build a **registration-only** plugin and confirm it appears, starts, and does not crash in Desktop GUI Chat.
3. Add a preprocessor marker; send a GUI-chat message and confirm the marker reaches the loaded local model.
4. Register one harmless tool; confirm schema visibility, a genuine model call, result return, and cancellation.
5. Add `memory_store` / `memory_search` wrappers only with exact audited SDK types; restart LM Studio and confirm the local file remains.
6. Store the Dari preference; issue a relevant GUI request and confirm the preprocessor included its context without replacing the request.
7. Test PredictionLoop in a separate plugin: start, completion, cancellation, repeated generations, no stuck spinner, no crash.
8. With OS firewall/monitoring enabled, run the plugin and inspect for unexpected connections. Do not pass until the selected monitor and observations are recorded.

Mark GUI claims only after recording observed version, model, plugin package, exact steps, result, and failure logs.
