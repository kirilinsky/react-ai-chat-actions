import { Loader } from "lucide-react";
import { ActionButtonProps } from "../../types";

const ActionButton = ({
  label,
  icon,
  disabled,
  loading,
  onClick,
  active,
  tabIndex,
  onFocus,
  onMouseEnter,
  liquidGlass,
}: ActionButtonProps) => {
  return (
    <button
      type="button"
      className={`ca-btn${liquidGlass ? " no-hover" : ""}`}
      aria-pressed={active}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      tabIndex={tabIndex}
      onClick={onClick}
      aria-label={label}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
    >
      {loading ? (
        <Loader size={16} className="ca-spinner" aria-hidden="true" />
      ) : (
        icon
      )}
    </button>
  );
};

export default ActionButton;
