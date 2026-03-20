import { useState } from "react";
import { ActionType } from "src/types";

const reconcile = (currentAction: ActionType, activeActions: ActionType[]) => {
  if (currentAction !== "like" && currentAction !== "dislike") {
    return activeActions;
  }
  const filterOption = currentAction === "like" ? "dislike" : "like";
  console.log(
    activeActions.filter((a) => a !== filterOption),
    "activeActions.filter((a) => a !== filterOption);",
  );

  return activeActions.filter((a) => a !== filterOption);
};

const useChatActions = ({
  messageId,
  onAction,
}: {
  messageId: string;
  onAction: (messageId: string, action: ActionType) => void;
}) => {
  const [activeActions, setActiveActions] = useState<ActionType[]>([]);

  const isActive = (action: ActionType) => activeActions.includes(action);

  const handleAction = (action: ActionType) => {
    const noStateActions: ActionType[] = ["copy", "regenerate"];

    if (noStateActions.includes(action)) {
      onAction(messageId, action);
      return;
    }

    if (isActive(action)) {
      setActiveActions((prev) => prev.filter((a) => a !== action));
    } else {
      let reconciledActions = reconcile(action, activeActions);
      onAction(messageId, action);
      setActiveActions([...reconciledActions, action]);
    }
  };

  console.log(activeActions, "console.log(activeActions);");
  return { isActive, handleAction };
};

export default useChatActions;
