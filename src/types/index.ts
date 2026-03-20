import { ReactNode } from "react";

export type ActionType =
  | "like"
  | "dislike"
  | "copy"
  | "regenerate"
  | "speak"
  | "options";

export type ActionButtonProps = {
  icon?: ReactNode;
  label?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

export type ActionBarProps = {
  messageId: string;
  visible?: boolean;
  actions: ActionType[];
  onClick: (messageId: string, action: ActionType) => void;
};

export type ActionButtonMeta = {
  icon: ReactNode;
  label: string;
};
