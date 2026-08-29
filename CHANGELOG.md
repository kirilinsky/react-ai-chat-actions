# react-ai-chat-actions

## 0.5.0

### Minor Changes

- e2b06b0: Add a `violet` theme family (`violet-pill`, `violet-soft`, `violet-sharp`), bringing the built-in theme count to fifteen.

  ```tsx
  <ActionBar theme="violet-pill" ... />
  ```

  Also fixed `scripts/gentypes.ts` (the theme codegen script): it wrote the generated CSS variables to `src/styles/index.css` instead of `src/styles/themes.css`, which would have overwritten the hand-written component styles on the next run. It now writes to the correct file and is wired up as `npm run gentypes`.

## 0.4.1

### Patch Changes

- e12428c: Fix tooltip and hover-mode `ActionBarWrapper` staying visible after clicking a button and moving the mouse away. Mouse clicks give a button plain focus (not just keyboard focus), and the accessibility pass used `:focus-within`, which kept the tooltip/bar open on any focus. Switched to `:has(:focus-visible)` so only keyboard focus keeps them open, matching the existing `:focus-visible` outline behavior.

## 0.4.0

### Minor Changes

- 2a1e022: Add `icons` prop to `ActionBar`/`ActionBarWrapper` to override the icon of any built-in action without switching it to a custom action. Label, aria-label, and tooltip text stay the built-in default; actions not listed in `icons` keep their default icon.

  ```tsx
  <ActionBar
    actions={["like", "dislike"]}
    icons={{ like: <Smile size={16} />, dislike: <Frown size={16} /> }}
    ...
  />
  ```

## 0.3.0

### Minor Changes

- 897304e: Controlled active state, custom actions, built-in copy/speak handlers, and an accessibility pass.

  - **Controlled active state**: new `activeActions`, `defaultActiveActions`, and `onActiveActionsChange` props let you persist like/dislike/pin state (e.g. from your server). Uncontrolled mode with internal state remains the default.
  - **Custom actions**: the `actions` array now accepts `{ id, icon, label, toggle? }` objects alongside built-in action names. Custom ids work in `loading`, `disabled`, and `activeActions`.
  - **Built-in handlers**: optional `copyText` prop enables clipboard copy with "Copied" feedback on the `copy` button; optional `speakText` enables text-to-speech via the Web Speech API on the `speak` button.
  - **Accessibility**: WAI-ARIA toolbar pattern — `role="toolbar"` with `ariaLabel` prop, roving tabindex with arrow-key/Home/End navigation, visible `:focus-visible` outline, tooltips on keyboard focus, `aria-busy` on loading buttons, `role="separator"` on dividers, and hover-mode `ActionBarWrapper` now reveals the bar on keyboard focus.

  Behavior changes to note:

  - `onAction` now also fires when a toggle action is switched off (previously silent), so feedback can be persisted correctly.
  - `onAction`'s action parameter type widened from `ActionType` to `ActionId` (`ActionTypeFiltered | string`) to support custom actions — explicitly typed callbacks may need the parameter type updated.
