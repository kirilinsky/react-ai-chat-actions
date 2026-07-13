import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ActionBar } from "../../components/action-bar/action-bar";
import "../../styles/index.css";
import { themeNames } from "../../themes";
import { ActionId } from "../../types";
import { Sparkles, Braces } from "lucide-react";

const meta: Meta<typeof ActionBar> = {
  decorators: [
    (Story) => (
      <div style={{ padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
  title: "ActionBar/Features",
  component: ActionBar,
  argTypes: {
    theme: {
      control: "select",
      options: themeNames,
    },
  },
  args: {
    messageId: "msg-1",
    visible: true,
    theme: "light-pill",
    onAction: (id, type) => console.log(id, type),
  },
};

export default meta;
type Story = StoryObj<typeof ActionBar>;

export const CustomActions: Story = {
  args: {
    actions: [
      "like",
      "dislike",
      "divider",
      { id: "explain", icon: <Sparkles size={16} />, label: "Explain" },
      {
        id: "show-json",
        icon: <Braces size={16} />,
        label: "Show JSON",
        toggle: true,
      },
    ],
  },
};

export const DefaultActive: Story = {
  args: {
    actions: ["like", "dislike", "divider", "pin", "bookmark"],
    defaultActiveActions: ["like", "pin"],
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [active, setActive] = useState<ActionId[]>(["dislike"]);
    return (
      <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
        <ActionBar
          {...args}
          activeActions={active}
          onActiveActionsChange={(_, next) => setActive(next)}
        />
        <code style={{ fontSize: 12 }}>active: {JSON.stringify(active)}</code>
      </div>
    );
  },
  args: {
    actions: ["like", "dislike", "divider", "heart", "bookmark"],
  },
};

export const BuiltInCopy: Story = {
  args: {
    actions: ["copy", "divider", "like", "dislike"],
    copyText: "Text copied straight from the ActionBar built-in handler.",
  },
};

export const BuiltInSpeak: Story = {
  args: {
    actions: ["speak", "divider", "copy"],
    speakText: "Hello! I am the built-in speak handler using the Web Speech API.",
    copyText: "Copied via built-in handler.",
  },
};
