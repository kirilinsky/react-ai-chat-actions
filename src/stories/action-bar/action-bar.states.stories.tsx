import type { Meta, StoryObj } from "@storybook/react";
import { ActionBar } from "../../components/action-bar/action-bar";
import "../../styles/index.css";
import { themeNames } from "../../themes";

const meta: Meta<typeof ActionBar> = {
  title: "ActionBar/States",
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

export const Loading: Story = {
  decorators: [(Story) => <Story />],
  args: {
    loading: ["regenerate"],
  },
};

export const Disabled: Story = {
  decorators: [(Story) => <Story />],
  args: {
    disabled: ["copy"],
  },
};

export const NoTooltip: Story = {
  decorators: [(Story) => <Story />],
  args: {
    tooltip: false,
  },
};

export const LiquidGlass: Story = {
  decorators: [(Story) => <Story />],
  args: {
    liquidGlass: true,
  },
};
