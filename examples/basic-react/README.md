# Basic React Usage

Use `ActionBar` when you already control the message layout and only need the action buttons.

```tsx
import { ActionBar } from "react-ai-chat-actions";
import "react-ai-chat-actions/dist/style.css";

export function MessageActions() {
  return (
    <ActionBar
      messageId="assistant-message-1"
      actions={["like", "dislike", "divider", "copy", "regenerate"]}
      theme="light-pill"
      onAction={(messageId, action) => {
        console.log("message action", { messageId, action });
      }}
    />
  );
}
```

`onAction` receives the message id first and the action second:

```ts
onAction(messageId, action);
```
