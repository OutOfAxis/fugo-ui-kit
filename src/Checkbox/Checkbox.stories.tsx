import Checkbox from "./";
import {
  ComponentMeta,
  ComponentStoryFn,
  ComponentStoryObj,
} from "@storybook/react";
import { useArgs } from "@storybook/client-api";

const Component = Checkbox;

type Case = ComponentStoryObj<typeof Component>;

export default {
  component: Component,
  argTypes: {
    value: {
      control: {
        type: "radio",
        options: [true, false, "mixed"],
      },
    },
  },
} as ComponentMeta<typeof Component>;

export const Base: ComponentStoryFn<typeof Component> = () => {
  const [args, setArgs] = useArgs();
  return (
    <Checkbox
      value={args.value}
      onChange={(e) => {
        args.onChange(e);
        setArgs({ value: e.target.checked });
      }}
    />
  );
};

export const Checked: Case = {
  args: {
    value: true,
  },
};

export const Mixed: Case = {
  args: {
    value: "mixed",
  },
};
