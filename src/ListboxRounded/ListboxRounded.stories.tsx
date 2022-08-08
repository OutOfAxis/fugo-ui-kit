import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { ListboxRounded } from "./index";
import { useArgs } from "@storybook/client-api";

const Component = ListboxRounded;

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
  const [args, setArgs] = useArgs();
  return (
    <ListboxRounded<any>
      {...props}
      onSelect={(newValue) => {
        setArgs({ ...args, selected: newValue });
      }}
    />
  );
};
Base.storyName = Component.name;
Base.args = {
  selected: "a",
  title: "Property",
  options: {
    a: "Option A",
    b: "Option B",
    c: "Option C",
  },
};
