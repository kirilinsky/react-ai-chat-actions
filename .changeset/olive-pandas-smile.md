---
"react-ai-chat-actions": minor
---

Controlled active state, custom actions, built-in copy/speak handlers, and an accessibility pass.

- **Controlled active state**: new `activeActions`, `defaultActiveActions`, and `onActiveActionsChange` props let you persist like/dislike/pin state (e.g. from your server). Uncontrolled mode with internal state remains the default.
- **Custom actions**: the `actions` array now accepts `{ id, icon, label, toggle? }` objects alongside built-in action names. Custom ids work in `loading`, `disabled`, and `activeActions`.
- **Built-in handlers**: optional `copyText` prop enables clipboard copy with "Copied" feedback on the `copy` button; optional `speakText` enables text-to-speech via the Web Speech API on the `speak` button.
- **Accessibility**: WAI-ARIA toolbar pattern — `role="toolbar"` with `ariaLabel` prop, roving tabindex with arrow-key/Home/End navigation, visible `:focus-visible` outline, tooltips on keyboard focus, `aria-busy` on loading buttons, `role="separator"` on dividers, and hover-mode `ActionBarWrapper` now reveals the bar on keyboard focus.

Behavior changes to note:

- `onAction` now also fires when a toggle action is switched off (previously silent), so feedback can be persisted correctly.
- `onAction`'s action parameter type widened from `ActionType` to `ActionId` (`ActionTypeFiltered | string`) to support custom actions — explicitly typed callbacks may need the parameter type updated.
