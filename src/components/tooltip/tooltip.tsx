import { ReactNode, useEffect, useRef, useState } from "react";

export const Tooltip = ({
  label,
  children,
  disabled = false,
}: {
  label: string;
  children: ReactNode;
  disabled?: boolean;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [side, setSide] = useState<"top" | "bottom">("top");

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleShow = () => {
    if (!wrapperRef.current || !tooltipRef.current) return;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!wrapperRef.current || !tooltipRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();

      const spaces = {
        top: rect.top,
        bottom: window.innerHeight - rect.bottom,
        left: rect.left,
        right: window.innerWidth - rect.right,
      };

      const side = spaces.top >= spaces.bottom ? "top" : "bottom";

      setSide(side);
    }, 0);
  };

  if (disabled) return children;

  return (
    <div
      className={`ca-tooltip-wrapper ca-tooltip--${side}`}
      ref={wrapperRef}
      onMouseEnter={handleShow}
      onFocus={handleShow}
    >
      {children}
      {/* text duplicates the button's aria-label, so hide from AT */}
      <span
        ref={tooltipRef}
        className="ca-tooltip"
        role="tooltip"
        aria-hidden="true"
      >
        {label}
      </span>
    </div>
  );
};
