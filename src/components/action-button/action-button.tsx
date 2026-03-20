import { ActionButtonProps } from "../../types";

export const ActionButton = ({
  label,
  icon,
  disabled,
  loading,
  onClick,
  active,
}: ActionButtonProps) => {
  return (
    <button
      className="ca-btn"
      aria-pressed={active}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={label}
    >
      {loading ? "loading..." : icon}
    </button>
  );
};

export default ActionButton;
