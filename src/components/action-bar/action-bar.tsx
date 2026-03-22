import { ActionBarProps } from "../../types";
import ActionButton from "../action-button/action-button";
import useChatActions from "../../hooks/use-chat-actions";
import { Tooltip } from "../tooltip/tooltip";
import buttonsMeta from "../../meta/buttons";
import { Fragment } from "react/jsx-runtime";
import { useRef } from "react";

export const ActionBar = ({
  messageId,
  actions,
  onAction,
  visible = true,
  transparent = false,
  loading,
  disabled,
  tooltip = true,
  liquidGlass,
  theme = "light-pill",
}: ActionBarProps) => {
  const { isActive, handleAction } = useChatActions({ messageId, onAction });

  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const handleButtonEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!liquidGlass || !pillRef.current || !barRef.current) return;

    const btn = e.currentTarget;
    const btnRect = btn.getBoundingClientRect();
    const barRect = barRef.current.getBoundingClientRect();

    const pill = pillRef.current;
    pill.style.translate = `${btnRect.left - barRect.left}px 0`;
    pill.style.width = `${btnRect.width}px`;
    pill.style.height = `${btnRect.height}px`;
    pill.classList.add("ca-glass-pill--visible");

    pill.classList.remove("ca-glass-pill--animate");
    requestAnimationFrame(() => pill.classList.add("ca-glass-pill--animate"));
  };

  const handleBarLeave = () => {
    if (!liquidGlass || !pillRef.current) return;
    pillRef.current.classList.remove("ca-glass-pill--visible");
  };

  if (!visible) return null;
  return (
    <div
      data-theme={theme}
      className={`ca-bar ${transparent && "transparent"}`}
      ref={barRef}
      onMouseLeave={handleBarLeave}
    >
      {liquidGlass && (
        <>
          <div ref={pillRef} className="ca-glass-pill" />
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <filter id="ca-glass-filter" primitiveUnits="objectBoundingBox">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="0.04"
                result="blur"
              />
              <feDisplacementMap
                in="blur"
                in2="SourceGraphic"
                scale="0.5"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </svg>
        </>
      )}
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
            onMouseEnter={handleButtonEnter}
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
