import {
  Bookmark,
  Copy,
  Edit,
  Heart,
  Languages,
  MoreHorizontal,
  Pin,
  RefreshCw,
  RotateCcwSquare,
  Share,
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
  heart: { icon: <Heart size={16} />, label: "Heart" },
  speak: { icon: <Volume2 size={16} />, label: "Speak" },
  options: { icon: <MoreHorizontal size={16} />, label: "Options" },
  share: { icon: <Share size={16} />, label: "Share" },
  bookmark: { icon: <Bookmark size={16} />, label: "Bookmark" },
  edit: { icon: <Edit size={16} />, label: "Edit" },
  translate: { icon: <Languages size={16} />, label: "Translate" },
  retry: { icon: <RotateCcwSquare size={16} />, label: "Retry" },
  pin: { icon: <Pin size={16} />, label: "Pin" },
  divider: { icon: null, label: "" },
};

export default buttonsMeta;
