import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { Tooltip } from "./index";
import { ButtonPrimary } from "../ButtonPrimary";

const Component = Tooltip;

type CaseFn = ComponentStoryFn<typeof Component>;

export default {
  component: Component,
  parameters: {
    docs: {
      description: {
        component: `[Original component](https://reach.tech/tooltip). Support \`hidden\` prop to disable the tooltip.`,
      },
    },
  },
  args: {},
  argTypes: {},
} as ComponentMeta<typeof Component>;

export const Base: CaseFn = (props) => {
  return (
    <Tooltip {...props}>
      <ButtonPrimary>Any element</ButtonPrimary>
    </Tooltip>
  );
};
Base.storyName = Component.name;
Base.args = {
  hidden: false,
  label: "Tooltip content",
};
