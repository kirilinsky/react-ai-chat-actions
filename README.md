# react-ai-chat-actions

[![npm](https://img.shields.io/npm/v/react-ai-chat-actions)](https://www.npmjs.com/package/react-ai-chat-actions)
[![npm downloads](https://img.shields.io/npm/dm/react-ai-chat-actions)](https://www.npmjs.com/package/react-ai-chat-actions)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-ai-chat-actions)](https://bundlephobia.com/package/react-ai-chat-actions)
[![license](https://img.shields.io/npm/l/react-ai-chat-actions)](./LICENSE)

<img src="https://i.ibb.co/fVNC9PSx/aichatlogo.png" alt="react-ai-chat-actions" width="400" />

Action bar for AI chat messages. Like, dislike, copy, regenerate, speak, pin — with themes, tooltips, and loading states out of the box.

**[Live demo →](https://react-ai-chat-actions.vercel.app/)**

---
## Install

```bash
npm install react-ai-chat-actions
```

---

<img src="https://i.ibb.co/Wvtvyvwc/image.png" alt="react-ai-chat-actions" width="400" />

## Usage

```tsx
import { ActionBar } from "react-ai-chat-actions";
import "react-ai-chat-actions/dist/style.css";

<ActionBar
  messageId="msg-1"
  visible={true}
  actions={["like", "dislike", "divider", "copy", "regenerate"]}
  onAction={(type, messageId) => console.log(type, messageId)}
/>;
```

---

## Props

| Prop        | Type                        | Default | Description                               |
| ----------- | --------------------------- | ------- | ----------------------------------------- |
| `messageId` | `string`                    | —       | Required. Passed back in `onAction`       |
| `visible`   | `boolean`                   | `true`  | Show or hide the bar                      |
| `actions`   | `ActionType[]`              | —       | Which buttons to render and in what order |
| `onAction`  | `(type, messageId) => void` | —       | Callback on any button click              |
| `loading`   | `ActionType[]`              | `[]`    | Buttons in loading state                  |
| `disabled`  | `ActionType[]`              | `[]`    | Buttons in disabled state                 |

### ActionType

```ts
type ActionType =
  | "like"
  | "dislike"
  | "copy"
  | "regenerate"
  | "speak"
  | "options"
  | "pin"
  | "divider";
```

---

## Themes

Four built-in themes: `light`, `dark`, `neon`, `square`.

Apply via `data-theme` on any parent element:

```tsx
<div data-theme="dark">
  <ActionBar ... />
</div>
```

---

## Roadmap

- [ ] `ChatMessageWrapper` — wrapper mode with built-in hover visibility
- [ ] Custom actions support
- [ ] More themes
- [ ] Animations

---

## License

MIT
