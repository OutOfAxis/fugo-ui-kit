import { usePortal, PortalProvider } from "./usePortal";
import { ComponentStoryFn, Meta } from "@storybook/react";
import ButtonPrimary from "../ButtonPrimary";
import Modal, { ModalFooter } from "../Modal";
import ButtonSecondary from "../ButtonSecondary";

export default {
  decorators: [
    (Story) => (
      <PortalProvider>
        <Story />
      </PortalProvider>
    ),
  ],
} as Meta;

export const Base: ComponentStoryFn<any> = () => {
  const showPortal = usePortal();
  return (
    <ButtonPrimary
      onClick={async () => {
        // you can use any type instead of boolean
        await showPortal<boolean>(({ onClose }) => (
          <Modal isOpen onClose={() => onClose(false)}>
            <div className="p-8">Modal content</div>
            <ModalFooter>
              <ButtonSecondary
                onClick={() => {
                  onClose(false);
                }}
              >
                Cancel
              </ButtonSecondary>
              <ButtonPrimary
                onClick={() => {
                  // Promise returned from showPortal resolves with argument passed to onClose
                  onClose(true);
                }}
              >
                Ok
              </ButtonPrimary>
            </ModalFooter>
          </Modal>
        ));
      }}
    >
      Show
    </ButtonPrimary>
  );
};
Base.storyName = "Portal";
Base.parameters = {
  docs: {
    source: {
      language: "tsx",
      type: "code",
    },
  },
};
