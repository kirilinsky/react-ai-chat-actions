# Next.js Chat Message Usage

Use `ActionBarWrapper` when you want the toolbar attached to a message bubble.

```tsx
"use client";

import { ActionBarWrapper } from "react-ai-chat-actions";

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

Styles are bundled with the package and load automatically with the import.
