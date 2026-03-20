import { createRoot } from "react-dom/client";
import { ActionBar } from "../src/components/action-bar/action-bar";
import "../src/styles/index.css";
import { inject } from "../src/themes";

inject();
createRoot(document.getElementById("root")!).render(
  <ActionBar
    messageId="msg-1"
    visible={true}
    actions={[
      "like",
      "dislike",
      "copy",
      "regenerate",
      "speak",
      "options",
      "pin",
    ]}
    onAction={(id, type) => console.log(type, id)}
  />,
);
