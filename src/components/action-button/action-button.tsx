import { ActionButtonProps } from "../../types";

const ActionButton = ({
  label,
  icon,
  disabled,
  loading,
  onClick,
  active,
}: ActionButtonProps) => {
  return (
    <button
      data-pressed={active}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={label}
    >
      {loading ? "loading..." : icon}
    </button>
  );
};

export default ActionButton;
