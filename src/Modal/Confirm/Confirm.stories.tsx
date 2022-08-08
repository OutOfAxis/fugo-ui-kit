import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import Confirm from "./index";
import { useArgs } from "@storybook/client-api";
import ButtonPrimary from "../../ButtonPrimary";

const Component = Confirm;

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
    <div>
      <ButtonPrimary
        onClick={() => {
          setArgs({ ...args, isOpen: true });
        }}
      >
        Dangerous action
      </ButtonPrimary>
      <Confirm
        {...props}
        onConfirm={(e) => {
          props.onConfirm?.(e);
          setArgs({ ...args, isOpen: false });
        }}
        onCancel={() => {
          props.onCancel?.();
          setArgs({ ...args, isOpen: false });
        }}
      />
    </div>
  );
};
Base.storyName = Component.name;
Base.args = {
  isOpen: false,
  size: "sm:max-w-screen-md",
  confirmTitle: "Confirm",
  title: "Are you sure?",
  footer: "",
  children: "Description of the dangerous action",
};
Base.argTypes = {
  size: {
    control: {
      type: "radio",
      options: [
        "sm:max-w-screen-xs",
        "sm:max-w-screen-sm",
        "sm:max-w-screen-md",
        "sm:max-w-screen-lg",
        "sm:max-w-screen-xl",
        "sm:max-w-screen-3/4",
        "xl:max-w-screen-2/3",
      ],
    },
  },
};
