import {
  Copy,
  MoreHorizontal,
  Pin,
  RefreshCw,
  ThumbsDown,
  ThumbsUp,
  Volume2,
} from "lucide-react";
import { ActionBarProps, ActionButtonMeta, ActionType } from "../../types";
import ActionButton from "../action-button/action-button";
import useChatActions from "../../hooks/use-chat-actions";
import { Tooltip } from "../tooltip/tooltip";

const buttonsMeta: Record<ActionType, ActionButtonMeta> = {
  like: { icon: <ThumbsUp size={16} />, label: "Like" },
  dislike: { icon: <ThumbsDown size={16} />, label: "Dislike" },
  copy: { icon: <Copy size={16} />, label: "Copy" },
  regenerate: { icon: <RefreshCw size={16} />, label: "Regenerate" },
  speak: { icon: <Volume2 size={16} />, label: "Speak" },
  options: { icon: <MoreHorizontal size={16} />, label: "Options" },
  pin: { icon: <Pin size={16} />, label: "pin" },
  divider: { icon: <div className="ca-divider" />, label: "" },
};

export const ActionBar = ({
  messageId,
  actions,
  onAction,
  visible,
  loading,
  disabled,
}: ActionBarProps) => {
  const { isActive, handleAction } = useChatActions({ messageId, onAction });

  if (!visible) return null;
  return (
    <div className="ca-bar">
      {actions.map((action) => {
        if (action === "divider") {
          return <div key={action} className="ca-divider" />;
        }
        let meta = buttonsMeta[action];
        let active = isActive(action);

        return (
          <Tooltip
            disabled={disabled?.includes(action)}
            label={meta.label}
            key={action}
          >
            <ActionButton
              {...meta}
              active={active}
              loading={loading?.includes(action)}
              disabled={disabled?.includes(action)}
              onClick={() => handleAction(action)}
            />
          </Tooltip>
        );
      })}
    </div>
  );
};

export default ActionBar;
