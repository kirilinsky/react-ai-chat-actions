import {
  Copy,
  MoreHorizontal,
  Pin,
  RefreshCw,
  ThumbsDown,
  ThumbsUp,
  Volume2,
} from "lucide-react";
import { ActionButtonMeta, ActionType } from "src/types";

const buttonsMeta: Record<ActionType, ActionButtonMeta> = {
  like: { icon: <ThumbsUp size={16} />, label: "Like" },
  dislike: { icon: <ThumbsDown size={16} />, label: "Dislike" },
  copy: { icon: <Copy size={16} />, label: "Copy" },
  regenerate: { icon: <RefreshCw size={16} />, label: "Regenerate" },
  speak: { icon: <Volume2 size={16} />, label: "Speak" },
  options: { icon: <MoreHorizontal size={16} />, label: "Options" },
  pin: { icon: <Pin size={16} />, label: "Pin" },
  divider: { icon: null, label: "" },
};

export default buttonsMeta;
