import { ReactNode } from "react";
import { ThemeName } from "src/theme";

export type ActionType =
  | "like"
  | "dislike"
  | "copy"
  | "regenerate"
  | "heart"
  | "speak"
  | "options"
  | "pin"
  | "divider"
  | "share"
  | "bookmark"
  | "edit"
  | "translate"
  | "retry";
export type ActionTypeFiltered = Exclude<ActionType, "divider">;

export type ActionButtonProps = {
  icon?: ReactNode;
  label?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  liquidGlass?: boolean;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type ActionButtonOptions = { loading?: boolean; disabled?: boolean };
export type ActionBarProps = {
  messageId: string;
  visible?: boolean;
  transparent?: boolean;
  actions: ActionType[];
  loading?: ActionTypeFiltered[];
  disabled?: ActionTypeFiltered[];
  onAction: (messageId: string, action: ActionType) => void;
  tooltip?: boolean;
  liquidGlass?: boolean;
  theme?: ThemeName;
};

export type ActionButtonMeta = {
  icon: ReactNode;
  label: string;
};

type ActionBarOnlyProps = Omit<ActionBarProps, "visible" | "messageId">

export type ActionBarWrapperProps = ActionBarOnlyProps & {
  children: ReactNode
  messageId: string
  float?: boolean
  verticalPosition?: "top" | "bottom"
  horizontalPosition?: "left" | "center" | "right"
  showOn?: "hover" | "always"
}
