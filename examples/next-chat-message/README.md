# Next.js Chat Message Usage

Use `ActionBarWrapper` when you want the toolbar attached to a message bubble.

```tsx
"use client";

import { ActionBarWrapper } from "react-ai-chat-actions";
import "react-ai-chat-actions/dist/style.css";

type ChatMessageProps = {
  id: string;
  content: string;
};

export function AssistantMessage({ id, content }: ChatMessageProps) {
  return (
    <ActionBarWrapper
      messageId={id}
      actions={["like", "dislike", "divider", "copy", "regenerate"]}
      showOn="hover"
      verticalPosition="bottom"
      horizontalPosition="left"
      onAction={(messageId, action) => {
        console.log("message action", { messageId, action });
      }}
    >
      <div className="rounded-lg bg-zinc-100 px-4 py-3 text-zinc-900">
        {content}
      </div>
    </ActionBarWrapper>
  );
}
```

Import the CSS once in a client entry, layout, or component that renders the chat UI.
