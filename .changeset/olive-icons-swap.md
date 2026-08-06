---
"react-ai-chat-actions": minor
---

Add `icons` prop to `ActionBar`/`ActionBarWrapper` to override the icon of any built-in action without switching it to a custom action. Label, aria-label, and tooltip text stay the built-in default; actions not listed in `icons` keep their default icon.

```tsx
<ActionBar
  actions={["like", "dislike"]}
  icons={{ like: <Smile size={16} />, dislike: <Frown size={16} /> }}
  ...
/>
```
