import { Meta, StoryFn } from "@storybook/react";
import { ListboxRounded } from "./index";
import { useArgs } from "@storybook/preview-api";

const Component = ListboxRounded;

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
Base.name = Component.name;
Base.args = {
  selected: "a",
  title: "Property",
  options: {
    a: "Option A",
    b: "Option B",
    c: "Option C",
  },
};
