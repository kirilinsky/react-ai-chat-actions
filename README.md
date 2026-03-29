# react-ai-chat-actions

[![npm](https://img.shields.io/npm/v/react-ai-chat-actions)](https://www.npmjs.com/package/react-ai-chat-actions)
[![npm downloads](https://img.shields.io/npm/dm/react-ai-chat-actions)](https://www.npmjs.com/package/react-ai-chat-actions)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-ai-chat-actions)](https://bundlephobia.com/package/react-ai-chat-actions)
[![license](https://img.shields.io/npm/l/react-ai-chat-actions)](./LICENSE)

<img src="https://i.ibb.co/fVNC9PSx/aichatlogo.png" alt="react-ai-chat-actions" width="400" />

Action bar for AI chat messages. Like, dislike, copy, regenerate, speak, pin — with themes, tooltips, loading states, and liquid glass effect out of the box.

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
  actions={["like", "dislike", "divider", "copy", "regenerate"]}
  onAction={(type, messageId) => console.log(type, messageId)}
/>;
```

---

## Props

| Prop          | Type                        | Default      | Description                               |
| ------------- | --------------------------- | ------------ | ----------------------------------------- |
| `messageId`   | `string`                    | —            | Required. Passed back in `onAction`       |
| `theme`       | `ThemeName`                 | `light-pill` | Theme preset, check type `ThemeName`      |
| `visible`     | `boolean`                   | `true`       | Show or hide the bar                      |
| `transparent` | `boolean`                   | `false`      | Transparent background of bar             |
| `actions`     | `ActionType[]`              | —            | Which buttons to render and in what order |
| `onAction`    | `(type, messageId) => void` | —            | Callback on any button click              |
| `loading`     | `ActionType[]`              | `[]`         | Buttons in loading state                  |
| `disabled`    | `ActionType[]`              | `[]`         | Buttons in disabled state                 |
| `tooltip`     | `boolean`                   | `true`       | Show tooltips on hover                    |
| `liquidGlass` | `boolean`                   | `false`      | Enable liquid glass hover effect          |

### ActionType

```ts
type ActionType =
  | "like"
  | "dislike"
  | "heart"
  | "copy"
  | "regenerate"
  | "retry"
  | "speak"
  | "pin"
  | "bookmark"
  | "share"
  | "edit"
  | "translate"
  | "options"
  | "divider";
```

<img src="https://i.ibb.co/bjx1g4Kz/image.png" alt="extra-actions" width="400" />

---

## Themes

Twelve built-in themes across four families — pill, soft, and sharp.

| Theme         | Shape                       |
| ------------- | --------------------------- |
| `light-pill`  | Light, fully rounded        |
| `light-soft`  | Light, slightly rounded     |
| `light-sharp` | Light, square corners       |
| `dark-pill`   | Dark, fully rounded         |
| `dark-soft`   | Dark, slightly rounded      |
| `dark-sharp`  | Dark, square corners        |
| `neon-pill`   | Neon glow, fully rounded    |
| `neon-soft`   | Neon glow, slightly rounded |
| `neon-sharp`  | Neon glow, square corners   |
| `olive-pill`  | Olive, fully rounded        |
| `olive-soft`  | Olive, slightly rounded     |
| `olive-sharp` | Olive, square corners       |

```tsx
<ActionBar theme="dark-sharp" ... />
```

---

## Liquid glass

<img src="https://i.ibb.co/bjH5WVM0/lg.gif" alt="liquid-glass-effect" width="400" />

Enable a glass-morphism sliding indicator that follows the cursor across buttons:

```tsx
<ActionBar
  liquidGlass={true}
  ...
/>
```

Works best on dark and neon themes.

---

## ActionBarWrapper

Wrap any component to attach the action bar to it. Controls position, visibility behavior, and layout mode.

<img src="https://i.ibb.co/sJd01CPQ/image.png" alt="wrapped" width="380" />

```tsx
import { ActionBarWrapper } from "react-ai-chat-actions";

<ActionBarWrapper
  messageId="msg-1"
  actions={["like", "dislike", "copy"]}
  onAction={(type, id) => console.log(type, id)}
  verticalPosition="bottom"
  horizontalPosition="left"
  showOn="hover"
  float={false}
>
  <div className="message">AI response text goes here</div>
</ActionBarWrapper>;
```

### ActionBarWrapper props

| Prop                 | Type                            | Default    | Description                                   |
| -------------------- | ------------------------------- | ---------- | --------------------------------------------- |
| `children`           | `ReactNode`                     | —          | The component the bar attaches to             |
| `verticalPosition`   | `"top" \| "bottom"`             | `"bottom"` | Render bar above or below children            |
| `horizontalPosition` | `"left" \| "center" \| "right"` | `"left"`   | Horizontal alignment of the bar               |
| `showOn`             | `"always" \| "hover"`           | `"always"` | Show bar always or only on hover              |
| `float`              | `boolean`                       | `false`    | Absolute positioning — bar floats over layout |

All `ActionBar` props are also supported.

---

## Roadmap

- [ ] Custom actions support
- [ ] Animations

---

## License

MIT
