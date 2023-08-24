import { Meta, StoryFn } from "@storybook/react";
import { Tag } from "./index";

const Component = Tag;

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
    <div className="flex space-x-2">
      <Tag color="default">default</Tag>
      <Tag color="error">error</Tag>
      <Tag color="warning">warning</Tag>
      <Tag color="success">success</Tag>
      <Tag color="info">info</Tag>
      <div className="w-32">
        <Tag color="default" truncateable>
          truncateable some long text that should be truncated
        </Tag>
      </div>
    </div>
  );
};
Base.name = Component.name;
