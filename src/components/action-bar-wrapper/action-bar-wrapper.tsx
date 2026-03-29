import { ActionBarWrapperProps } from "src/types";
import ActionBar from "../action-bar/action-bar";

export const ActionBarWrapper = ({
  children,
  float = false,
  verticalPosition = "bottom",
  horizontalPosition = "right",
  showOn = "always",
  ...barProps
}: ActionBarWrapperProps) => {
  return (
    <div
      className={[
        "ca-wrapper",
        `ca-wrapper--${verticalPosition}`,
        `ca-wrapper--${horizontalPosition}`,
        float ? "ca-wrapper--float" : "",
        showOn === "hover" ? "ca-wrapper--hover" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {verticalPosition === "top" && (
        <div className="ca-wrapper-hover">
          <ActionBar {...barProps} visible={true} />
        </div>
      )}
      {children}
      {verticalPosition === "bottom" && (
        <div className="ca-wrapper-hover">
          <ActionBar {...barProps} visible={true} />
        </div>
      )}
    </div>
  );
};
