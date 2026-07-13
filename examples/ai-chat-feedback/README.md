# AI Chat Feedback Handling

Persist like/dislike on your server with controlled active state, let the built-in handler do the clipboard work, and use `onAction` for the rest.

```tsx
import { useState } from "react";
import { ActionBar, type ActionId } from "react-ai-chat-actions";

type AssistantFeedbackProps = {
  messageId: string;
  content: string;
  initialFeedback: ActionId[]; // e.g. ["like"] loaded from your API
};

export function AssistantFeedback({
  messageId,
  content,
  initialFeedback,
}: AssistantFeedbackProps) {
  const [active, setActive] = useState<ActionId[]>(initialFeedback);
  const [loading, setLoading] = useState<ActionId[]>([]);

  async function handleActiveChange(id: string, next: ActionId[]) {
    setActive(next);
    await fetch("/api/chat/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId: id, active: next }),
    });
  }

  async function handleAction(id: string, action: ActionId) {
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
    }
  }

  return (
    <ActionBar
      messageId={messageId}
      actions={["like", "dislike", "divider", "copy", "regenerate"]}
      activeActions={active}
      onActiveActionsChange={handleActiveChange}
      copyText={content}
      loading={loading}
      onAction={handleAction}
    />
  );
}
```

Notes:

- `activeActions` + `onActiveActionsChange` make the toggle state controlled — like/dislike survive reloads because they come from your API.
- `copyText` enables the built-in clipboard handler with "Copied" feedback — no manual `navigator.clipboard` code.
- `onAction` still fires on every click (including toggling off), so analytics can hook in there.
