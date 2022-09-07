import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { EditableTitle } from "./index";
import { useArgs } from "@storybook/client-api";
import { Header } from "../Header";

const Component = EditableTitle;

type CaseFn = ComponentStoryFn<typeof Component>;

export default {
  component: Component,
} as ComponentMeta<typeof Component>;

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
