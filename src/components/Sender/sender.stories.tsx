import type { Meta, StoryObj } from "@storybook/react";
import { Sender } from "./Sender";

const meta: Meta<typeof Sender> = {
  title: "Components/sender",
  component: Sender,
  argTypes: {
    type: { control: "radio", options: ["text","password","email","number","tel","url","search","date","time","datetime-local","month","week"] }
  }
};
export default meta;

type Story = StoryObj<typeof Sender>;

export const Primary: Story = { args: {  } };

