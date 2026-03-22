import { Loader } from "lucide-react";
import { ActionButtonProps } from "../../types";

export const ActionButton = ({
  label,
  icon,
  disabled,
  loading,
  onClick,
  active,
  onMouseEnter,
  liquidGlass,
}: ActionButtonProps) => {
  return (
    <button
      className={`ca-btn ${liquidGlass && "no-hover"}`}
      aria-pressed={active}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={label}
      onMouseEnter={onMouseEnter}
    >
      {loading ? <Loader size={16} className="ca-spinner" /> : icon}
    </button>
  );
};

export default ActionButton;
