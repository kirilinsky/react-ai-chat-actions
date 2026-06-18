# AI Chat Feedback Handling

Use `onAction` to connect message actions to your chat logic, analytics, or feedback API.

```tsx
import { useState } from "react";
import { ActionBar, type ActionType } from "react-ai-chat-actions";
import "react-ai-chat-actions/dist/style.css";

export function AssistantFeedback({ messageId }: { messageId: string }) {
  const [loading, setLoading] = useState<ActionType[]>([]);

  async function handleAction(id: string, action: ActionType) {
    if (action === "copy") {
      await navigator.clipboard.writeText("Assistant response text");
      return;
    }

    if (action === "regenerate") {
      setLoading(["regenerate"]);
      try {
        await fetch("/api/chat/regenerate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messageId: id }),
        });
      } finally {
        setLoading([]);
      }
      return;
    }

    await fetch("/api/chat/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId: id, action }),
    });
  }

  return (
    <ActionBar
      messageId={messageId}
      actions={["like", "dislike", "divider", "copy", "regenerate"]}
      loading={loading}
      onAction={handleAction}
    />
  );
}
```
