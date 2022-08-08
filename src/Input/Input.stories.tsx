import {
  ComponentMeta,
  ComponentStoryFn,
  ComponentStoryObj,
} from "@storybook/react";
import Input from "./index";
import { useArgs } from "@storybook/client-api";
import { PremiumIconSvg } from "../Icons/PremiumIcon";

const Component = Input;

type Case = ComponentStoryObj<typeof Component>;
type CaseFn = ComponentStoryFn<typeof Component>;

export default {
  component: Component,
  args: {},
  argTypes: {
    description: {
      type: "string",
    },
    error: {
      type: "string",
    },
  },
} as ComponentMeta<typeof Component>;

export const Base: CaseFn = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <Input
      {...props}
      autoFocus
      onValueChange={(newValue) => {
        props.onValueChange?.(newValue);
        setArgs({ ...args, value: newValue });
      }}
    />
  );
};

export const WithDescriptionAndIcon: Case = {
  args: {
    withDescription: true,
    description: "Some description for the input",
    icon: <PremiumIconSvg />,
  },
};

export const WithErrorAndLabel: Case = {
  args: {
    withDescription: true,
    error: "Some error text here",
    label: "Input label",
  },
};

export const Disabled: Case = {
  args: {
    disabled: true,
  },
};
