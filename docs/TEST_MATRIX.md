# Test Matrix

| Area | Evidence | Status | Execution |
|---|---|---|---|
| Core CRUD/retrieval/context | B | PASS | Node tests in this Linux VM |
| Atomic JSON persistence | B | PASS | Node test |
| Local protocol dispatcher | B | PASS | Node test |
| Static offline scan | B | PASS after command | Source/config scan |
| LM Studio registration/preprocessor/tools | C | UNPROVEN | Requires Windows GUI |
| PredictionLoop / assistant capture | C | UNPROVEN | Requires isolated GUI test |
| Windows execution | C | UNPROVEN | No Windows target available |
| Kali | C | UNPROVEN | Generic Linux is not Kali proof |
| Termux | C | UNPROVEN | No Android/Termux target |
| VS Code | C | UNPROVEN | No extension or real entry point |
| Mem0 / LangChain | C | UNPROVEN | Not installed |

Commands expected for VM evidence: `npm run build`, `npm test`, `npm run test:offline`, `npm run memory -- doctor`.
