import { ReactNode } from "react";

export type ActionType =
  | "like"
  | "dislike"
  | "copy"
  | "regenerate"
  | "speak"
  | "options"
  | "pin"
  | "divider";
export type ActionTypeFiltered = Exclude<ActionType, "divider">;

export type ActionButtonProps = {
  icon?: ReactNode;
  label?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

export type ActionButtonOptions = { loading?: boolean; disabled?: boolean };
export type ActionBarProps = {
  messageId: string;
  visible?: boolean;
  actions: ActionType[];
  loading?: ActionTypeFiltered[];
  disabled?: ActionTypeFiltered[]; 
  onAction: (messageId: string, action: ActionType) => void;
};

export type ActionButtonMeta = {
  icon: ReactNode;
  label: string;
};
