import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { Card, CardTitle } from "./index";

const Component = Card;

type CaseFn = ComponentStoryFn<typeof Component>;

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
} as ComponentMeta<typeof Component>;

export const Base: CaseFn = (props) => {
  return (
    <Card {...props}>
      <CardTitle>Card Title</CardTitle>
      <p>Card Content</p>
    </Card>
  );
};
Base.storyName = Component.displayName;
