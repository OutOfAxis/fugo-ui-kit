import { Meta, StoryFn } from "@storybook/react";
import { StatusDot } from "./index";

const Component = StatusDot;

type CaseFn = StoryFn<typeof Component>;

export default {
  component: Component,
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
  },
  args: {},
  argTypes: {},
} as Meta<typeof Component>;

export const Base: CaseFn = () => {
  return (
    <div className="space-y-4">
      <StatusDot color="success" label="success" />
      <StatusDot color="muted" label="muted" />
      <StatusDot color="warning" label="warning" />
      <StatusDot color="error" label="error" />
    </div>
  );
};
Base.name = Component.name;
