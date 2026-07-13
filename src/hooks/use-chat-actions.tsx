import { useRef, useState } from "react";
import { ActionId } from "src/types";

const reconcile = (currentAction: ActionId, activeActions: ActionId[]) => {
  if (currentAction !== "like" && currentAction !== "dislike") {
    return activeActions;
  }
  const filterOption = currentAction === "like" ? "dislike" : "like";

  return activeActions.filter((a) => a !== filterOption);
};

const useChatActions = ({
  messageId,
  onAction,
  toggleIds,
  activeActions,
  defaultActiveActions,
  onActiveActionsChange,
}: {
  messageId: string;
  onAction: (messageId: string, action: ActionId) => void;
  toggleIds: Set<string>;
  activeActions?: ActionId[];
  defaultActiveActions?: ActionId[];
  onActiveActionsChange?: (messageId: string, active: ActionId[]) => void;
}) => {
  const [internalActive, setInternalActive] = useState<ActionId[]>(
    defaultActiveActions ?? []
  );
  const isControlled = activeActions !== undefined;
  const active = isControlled ? activeActions : internalActive;
  // ref keeps async callers (e.g. speech onend) off stale closures
  const activeRef = useRef(active);
  activeRef.current = active;

  const isActive = (action: ActionId) => active.includes(action);

  const applyActive = (next: ActionId[]) => {
    if (!isControlled) setInternalActive(next);
    onActiveActionsChange?.(messageId, next);
  };

  const setActionActive = (action: ActionId, value: boolean) => {
    const current = activeRef.current;
    if (current.includes(action) === value) return;
    applyActive(
      value
        ? [...reconcile(action, current), action]
        : current.filter((a) => a !== action)
    );
  };

  const handleAction = (action: ActionId) => {
    onAction(messageId, action);
    if (!toggleIds.has(action)) return;
    setActionActive(action, !activeRef.current.includes(action));
  };

  return { isActive, handleAction, setActionActive };
};

export default useChatActions;
