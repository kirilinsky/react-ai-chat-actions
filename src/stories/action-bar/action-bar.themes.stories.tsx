import type { Meta, StoryObj } from "@storybook/react";
import { ActionBar } from "../../components/action-bar/action-bar";
import "../../styles/index.css";

const meta: Meta<typeof ActionBar> = {
  title: "ActionBar/Themes",
  component: ActionBar,
  args: {
    messageId: "msg-1",
    visible: true,
    actions: [
      "like",
      "dislike",
      "divider",
      "copy",
      "regenerate",
      "speak",
      "options",
      "pin",
    ],
    onAction: (type, id) => console.log(type, id),
  },
};

export default meta;
type Story = StoryObj<typeof ActionBar>;

export const LightPill: Story = {
  decorators: [(Story) => <Story />],
  args: {
    theme: "light-pill",
  },
};

export const LightSoft: Story = {
  decorators: [(Story) => <Story />],
  args: {
    theme: "light-soft",
  },
};

export const LightSharp: Story = {
  decorators: [(Story) => <Story />],
  args: {
    theme: "light-sharp",
  },
};
export const DarkPill: Story = {
  decorators: [(Story) => <Story />],
  args: {
    theme: "dark-pill",
  },
};

export const DarkSoft: Story = {
  decorators: [(Story) => <Story />],
  args: {
    theme: "dark-soft",
  },
};

export const DarkSharp: Story = {
  decorators: [(Story) => <Story />],
  args: {
    theme: "dark-sharp",
  },
};

export const NeonPill: Story = {
  decorators: [(Story) => <Story />],
  args: {
    theme: "neon-pill",
  },
};

export const NeonSoft: Story = {
  decorators: [(Story) => <Story />],
  args: {
    theme: "neon-soft",
  },
};

export const NeonSharp: Story = {
  decorators: [(Story) => <Story />],
  args: {
    theme: "neon-sharp",
  },
};
