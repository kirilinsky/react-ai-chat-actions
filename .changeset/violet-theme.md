---
"react-ai-chat-actions": minor
---

Add a `violet` theme family (`violet-pill`, `violet-soft`, `violet-sharp`), bringing the built-in theme count to fifteen.

```tsx
<ActionBar theme="violet-pill" ... />
```

Also fixed `scripts/gentypes.ts` (the theme codegen script): it wrote the generated CSS variables to `src/styles/index.css` instead of `src/styles/themes.css`, which would have overwritten the hand-written component styles on the next run. It now writes to the correct file and is wired up as `npm run gentypes`.
