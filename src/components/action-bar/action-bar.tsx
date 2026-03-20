import { ActionBarProps, ActionButtonMeta, ActionType } from "../../types";
import ActionButton from "../action-button/action-button";

const buttonsMeta: Record<ActionType, ActionButtonMeta> = {
  like: {
    icon: <span>LIKE ICON</span>,
    label: "LIKE",
  },
  dislike: {
    icon: <span>dislike ICON</span>,
    label: "dislike",
  },
  copy: { icon: <span>copy ICON</span>, label: "copy" },
  regenerate: {
    icon: <span>regenerate ICON</span>,
    label: "regenerate",
  },
  speak: { icon: <span>speak ICON</span>, label: "speak" },
  options: {
    icon: <span>options ICON</span>,
    label: "options",
  },
};

const ActionBar = ({
  messageId,
  actions,
  onClick,
  visible,
}: ActionBarProps) => {
  const handleOnActionClick = (action: ActionType) => {
    onClick(messageId, action);
  };

  if (!visible) return null;
  return (
    <div>
      {actions.map((action) => {
        let meta = buttonsMeta[action];
        return (
          <ActionButton
            key={action}
            {...meta}
            onClick={() => handleOnActionClick(action)}
          />
        );
      })}
    </div>
  );
};

export default ActionBar;
