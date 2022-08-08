import { ComponentStoryFn, Meta } from "@storybook/react";
import {
  NotificationProvider,
  useNotification,
  useSuccessNotification,
} from "./Notification";
import ButtonPrimary from "../ButtonPrimary";

export default {
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
  },
  decorators: [
    (Story) => (
      <NotificationProvider>
        <Story />
      </NotificationProvider>
    ),
  ],
} as Meta;

export const Base: ComponentStoryFn<any> = () => {
  const showNotification = useNotification();
  return (
    <ButtonPrimary
      onClick={() => {
        showNotification({
          content: () => <div>Notification content with any style</div>,
          duration: 3000,
          isClosable: true,
        });
      }}
    >
      useNotification
    </ButtonPrimary>
  );
};
Base.storyName = "useNotification";
Base.parameters = {
  docs: {
    source: {
      code: `
const showNotification = useNotification();
showNotification({
  content: () => <div>Notification content with any style</div>,
  duration: 3000,
  isClosable: true,
});
      `,
      language: "jsx",
      type: "auto",
    },
  },
};

export const Success: ComponentStoryFn<any> = () => {
  const showNotification = useSuccessNotification();
  return (
    <ButtonPrimary
      onClick={() => {
        showNotification({
          content: () => <div>Success</div>,
          duration: 3000,
          isClosable: true,
        });
      }}
    >
      useSuccessNotification
    </ButtonPrimary>
  );
};
Success.storyName = "useSuccessNotification";
Success.parameters = {
  docs: {
    source: {
      code: `
const showNotification = useSuccessNotification();
showNotification({
  content: () => <div>Success</div>,
  duration: 3000,
  isClosable: true,
});
      `,
      language: "jsx",
      type: "auto",
    },
  },
};
