import { Meta, StoryFn } from "@storybook/react";
import { EditableTitle } from "./index";
import { useArgs } from "@storybook/preview-api";
import { Header } from "../Header";

const Component = EditableTitle;

type CaseFn = StoryFn<typeof Component>;

export default {
  component: Component,
} as Meta<typeof Component>;

export const Base: CaseFn = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <EditableTitle
      {...props}
      onChange={(newValue) => {
        props.onChange?.(newValue);
        setArgs({ ...args, value: newValue });
      }}
    />
  );
};
Base.args = {
  value: "Title",
};

export const InHeader: CaseFn = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <Header>
      <EditableTitle
        {...props}
        onChange={(newValue) => {
          props.onChange?.(newValue);
          setArgs({ ...args, value: newValue });
        }}
      />
    </Header>
  );
};
InHeader.args = {
  value: "Title",
};
