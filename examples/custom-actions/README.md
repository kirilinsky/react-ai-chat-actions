# Custom Actions

Mix your own actions with built-in ones directly in the `actions` array. A custom action needs `id`, `icon`, and `label`; add `toggle: true` to make it stateful like `like` or `pin`.

```tsx
import { ActionBar, type ActionId } from "react-ai-chat-actions";
import { Sparkles, Braces } from "lucide-react";

export function MessageActions({ messageId }: { messageId: string }) {
  function handleAction(id: string, action: ActionId) {
    if (action === "explain") {
      // your logic: ask the model to explain this message
    }
    if (action === "show-json") {
      // toggle raw JSON view — active state is tracked for you
    }
  }

  return (
    <ActionBar
      messageId={messageId}
      actions={[
        "like",
        "dislike",
        "divider",
        { id: "explain", icon: <Sparkles size={16} />, label: "Explain" },
        {
          id: "show-json",
          icon: <Braces size={16} />,
          label: "Show JSON",
          toggle: true,
        },
      ]}
      onAction={handleAction}
    />
  );
}
```

Notes:

- Custom ids work everywhere built-in ones do: `loading`, `disabled`, `activeActions`, `defaultActiveActions`.
- Any `ReactNode` works as `icon` — lucide, heroicons, an emoji, an `<svg>`.
- `label` is used for the tooltip and `aria-label`.
