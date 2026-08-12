---
"react-ai-chat-actions": patch
---

Fix tooltip and hover-mode `ActionBarWrapper` staying visible after clicking a button and moving the mouse away. Mouse clicks give a button plain focus (not just keyboard focus), and the accessibility pass used `:focus-within`, which kept the tooltip/bar open on any focus. Switched to `:has(:focus-visible)` so only keyboard focus keeps them open, matching the existing `:focus-visible` outline behavior.
