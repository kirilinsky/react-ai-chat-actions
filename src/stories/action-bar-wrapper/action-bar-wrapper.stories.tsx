import type { Meta, StoryObj } from "@storybook/react";
import "../../styles/index.css";
import { ActionBarWrapper } from "../../components/action-bar-wrapper/action-bar-wrapper";
import { themeNames } from "../../themes";

const Message = ({ text }: { text: string }) => (
  <div
    style={{
      padding: " 16px",
      margin: "5px",
      background: "#f3f4f6",
      borderRadius: 12,
      maxWidth: 360,
      fontSize: 16,
      lineHeight: 1.6,
      color: "#374151",
    }}
  >
    {text}
  </div>
);

const meta: Meta<typeof ActionBarWrapper> = {
  decorators: [
    (Story) => (
      <div style={{ padding: "80px 40px" }}>
        <Story />
      </div>
    ),
  ],
  title: "ActionBarWrapper",
  component: ActionBarWrapper,
  argTypes: {
    verticalPosition: { control: "select", options: ["top", "bottom"] },
    horizontalPosition: {
      control: "select",
      options: ["left", "center", "right"],
    },
    showOn: { control: "select", options: ["always", "hover"] },
    float: { control: "boolean" },
    theme: { control: "select", options: themeNames },
  },
  args: {
    messageId: "msg-1",
    verticalPosition: "bottom",
    horizontalPosition: "left",
    showOn: "always",
    float: false,
    theme: "light-pill",
    actions: ["like", "dislike", "divider", "copy", "regenerate"],
    onAction: (type, id) => console.log(type, id),
    children: (
      <Message
        text="Sure thing! Here's a quick summary of the key points from the article you shared: 
       The main argument is that..."
      />
    ),
  },
};

export default meta;
type Story = StoryObj<typeof ActionBarWrapper>;

export const Default: Story = {};

export const OnHover: Story = {
  args: { showOn: "hover" },
};

export const FloatBottom: Story = {
  args: {
    float: true,
    verticalPosition: "bottom",
    horizontalPosition: "right",
  },
};

export const FloatTop: Story = {
  args: { float: true, verticalPosition: "top", horizontalPosition: "left" },
};

export const DefaultVsFloat: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "70px 40px",
          display: "flex",
          gap: 40,
          alignItems: "flex-start",
        }}
      >
        <div>
          <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>
            Default — in flow
          </p>
          <Story />
          <Message text="Some another message here, you can see that for floated bar" />
        </div>
        <div>
          <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>
            Float — absolute
          </p>
          <ActionBarWrapper
            messageId="msg-2"
            float={true}
            verticalPosition="bottom"
            horizontalPosition="left"
            showOn="hover"
            theme="light-pill"
            actions={["like", "dislike", "divider", "copy", "regenerate"]}
            onAction={() => {}}
          >
            <Message text="Same message, bar floats outside layout" />
          </ActionBarWrapper>{" "}
          <Message text="Some another message here, you can see that for floated bar" />
        </div>
      </div>
    ),
  ],
};
