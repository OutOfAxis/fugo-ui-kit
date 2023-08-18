import { Meta, StoryFn, StoryObj } from "@storybook/react";
import {
  Input,
  InputGroup,
  InputLabel,
  InputCleanAdornment,
  InputBase,
  InputCopyAdornment,
  InputEndAdornment,
  InputContainer,
  InputMessage,
  InputDescription,
  InputShowPasswordAdornment,
  InputHeader,
} from "./index";
import { useArgs } from "@storybook/preview-api";
import { PremiumIconSvg } from "../Icons/PremiumIcon";

const Component = Input;

type Case = StoryObj<typeof Component>;
type CaseFn = StoryFn<typeof Component>;

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
} as Meta<typeof Component>;

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

export const Complex: CaseFn = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <InputGroup
      {...props}
      value="Some value"
      onValueChange={(newValue) => {
        props.onValueChange?.(newValue);
        setArgs({ ...args, value: newValue });
      }}
      type="password"
      disabled
      error="Some error text here"
      success
    >
      <InputHeader>Header</InputHeader>
      <InputDescription>Some description</InputDescription>
      <InputLabel>Label</InputLabel>
      <InputContainer>
        <InputBase />
        <InputEndAdornment>
          <InputCopyAdornment />
          <InputCleanAdornment />
          <InputShowPasswordAdornment />
        </InputEndAdornment>
      </InputContainer>
      <InputMessage />
    </InputGroup>
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
