import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { NumberInputBase, NumberInput } from "./index";
import { useArgs } from "@storybook/client-api";

const Component = NumberInputBase;

type CaseFn = ComponentStoryFn<typeof Component>;

export default {
  component: Component,
  parameters: {
    viewMode: "story",
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
  const [args, setArgs] = useArgs();
  return (
    <NumberInputBase
      {...props}
      onValueChange={(value) => {
        props.onValueChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
Base.storyName = "InputNumberBase";

export const Styled: ComponentStoryFn<typeof NumberInput> = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <NumberInput
      {...props}
      onValueChange={(value) => {
        props.onValueChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
