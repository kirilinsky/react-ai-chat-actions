import { ActionBarProps } from "../../types";
import ActionButton from "../action-button/action-button";
import useChatActions from "../../hooks/use-chat-actions";
import { Tooltip } from "../tooltip/tooltip";
import buttonsMeta from "../../meta/buttons";
import { Fragment } from "react/jsx-runtime";
import { useRef, useState } from "react";

export const ActionBar = ({
  messageId,
  actions,
  onAction,
  visible = true,
  loading,
  disabled,
  tooltip = true,
  liquidGlass,
  theme,
}: ActionBarProps) => {
  const { isActive, handleAction } = useChatActions({ messageId, onAction });
  const [glassStyle, setGlassStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  const barRef = useRef<HTMLDivElement>(null);

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!liquidGlass) return;
    const btn = e.currentTarget;
    const parent = btn.closest(".ca-bar") as HTMLElement;
    if (!parent) return;

    const btnRect = btn.getBoundingClientRect();
    const barRect = parent.getBoundingClientRect();

    setGlassStyle({
      opacity: 1,
      transform: `translateX(${btnRect.left - barRect.left}px)`,
      width: btnRect.width,
      height: btnRect.height,
    });
  };

  const handleBarLeave = () => {
    setGlassStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  if (!visible) return null;
  return (
    <div
      data-theme={theme}
      className="ca-bar"
      ref={barRef}
      onMouseLeave={handleBarLeave}
    >
      {liquidGlass && <div className="ca-glass-cursor" style={glassStyle} />}
      {actions.map((action) => {
        if (action === "divider") {
          return <div key={action} className="ca-divider" />;
        }
        let meta = buttonsMeta[action];
        let active = isActive(action);

        const button = (
          <ActionButton
            {...meta}
            liquidGlass={liquidGlass}
            active={active}
            loading={loading?.includes(action)}
            disabled={disabled?.includes(action)}
            onClick={() => handleAction(action)}
            onMouseEnter={(e) => handleButtonHover(e)}
          />
        );

        return tooltip ? (
          <Tooltip
            key={action}
            label={meta.label}
            disabled={disabled?.includes(action)}
          >
            {button}
          </Tooltip>
        ) : (
          <Fragment key={action}>{button}</Fragment>
        );
      })}
    </div>
  );
};

export default ActionBar;
