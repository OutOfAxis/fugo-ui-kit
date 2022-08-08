import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import Modal, { ModalHeader, ModalContent, ModalFooter } from "./index";
import { useArgs } from "@storybook/client-api";
import ButtonPrimary from "../ButtonPrimary";

const Component = Modal;

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
  subcomponents: {
    ModalHeader,
    ModalContent,
    ModalFooter,
  },
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
        Open
      </ButtonPrimary>
      <Modal
        {...props}
        onClose={() => {
          props.onClose?.();
          setArgs({ ...args, isOpen: false });
        }}
      >
        <ModalHeader>Modal header</ModalHeader>
        <ModalContent>
          <div className="h-60 w-screen">Modal content</div>
        </ModalContent>
        <ModalFooter>
          <ButtonPrimary
            onClick={() => {
              props.onClose?.();
              setArgs({ ...args, isOpen: false });
            }}
          >
            Close
          </ButtonPrimary>
        </ModalFooter>
      </Modal>
    </div>
  );
};
Base.storyName = Component.name;
Base.args = {
  isOpen: false,
  size: "sm:max-w-screen-md",
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
