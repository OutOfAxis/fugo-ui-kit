import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import Modal, { ModalFooter } from "../Modal";
import { ModalTabs, ModalTabList, ModalTab } from "./ModalTabs";
import { useArgs } from "@storybook/client-api";
import ButtonPrimary from "../ButtonPrimary";
import { TabPanel, TabPanels } from "@reach/tabs";

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
  subcomponents: { ModalTabs, ModalTabList, ModalTab },
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
        <ModalTabs>
          <ModalTabList>
            <ModalTab>Tab A</ModalTab>
            <ModalTab>Tab B</ModalTab>
            <ModalTab>Tab C</ModalTab>
          </ModalTabList>
          <TabPanels className="overflow-auto w-screen">
            <TabPanel>Content for Tab A</TabPanel>
            <TabPanel>Content for Tab B</TabPanel>
            <TabPanel>Content for Tab C</TabPanel>
          </TabPanels>
        </ModalTabs>
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
Base.storyName = "ModalTabs";
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
