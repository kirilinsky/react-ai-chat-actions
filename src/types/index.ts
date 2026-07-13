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
  | "report"
  | "translate"
  | "retry";
export type ActionTypeFiltered = Exclude<ActionType, "divider">;

export type ActionId = ActionTypeFiltered | (string & {});

export type CustomAction = {
  id: string;
  icon: ReactNode;
  label: string;
  toggle?: boolean;
};

export type ActionItem = ActionType | CustomAction;

export type ActionButtonProps = {
  icon?: ReactNode;
  label?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  liquidGlass?: boolean;
  tabIndex?: number;
  onFocus?: () => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type ActionButtonOptions = { loading?: boolean; disabled?: boolean };
export type ActionBarProps = {
  messageId: string;
  visible?: boolean;
  transparent?: boolean;
  actions: ActionItem[];
  loading?: ActionId[];
  disabled?: ActionId[];
  onAction: (messageId: string, action: ActionId) => void;
  activeActions?: ActionId[];
  defaultActiveActions?: ActionId[];
  onActiveActionsChange?: (messageId: string, active: ActionId[]) => void;
  copyText?: string | (() => string);
  speakText?: string | (() => string);
  ariaLabel?: string;
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
