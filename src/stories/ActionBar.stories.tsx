import type { Meta, StoryObj } from "@storybook/react";
import { ActionBar } from "../components/action-bar/action-bar";
import "../styles/index.css";

const meta: Meta<typeof ActionBar> = {
  title: "ActionBar",
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

export const Light: Story = {
  decorators: [
    (Story) => (
      <div data-theme="light" style={{ padding: 20 }}>
        <Story />
      </div>
    ),
  ],
};

export const Square: Story = {
  decorators: [
    (Story) => (
      <div data-theme="square" style={{ padding: 20 }}>
        <Story />
      </div>
    ),
  ],
};

export const Dark: Story = {
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ padding: 20, background: "#1e1e1e" }}>
        <Story />
      </div>
    ),
  ],
};

export const Neon: Story = {
  decorators: [
    (Story) => (
      <div data-theme="neon" style={{ padding: 20, background: "#0d0d0d" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithActive: Story = {
  decorators: [
    (Story) => (
      <div data-theme="light" style={{ padding: 20 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    loading: ["regenerate"],
    disabled: ["copy"],
  },
};
