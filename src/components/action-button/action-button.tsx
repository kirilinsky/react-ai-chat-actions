import { Loader } from "lucide-react";
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
      {loading ? <Loader size={16} className="ca-spinner" /> : icon}
    </button>
  );
};

export default ActionButton;
