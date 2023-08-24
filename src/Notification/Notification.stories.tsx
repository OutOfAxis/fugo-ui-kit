import { StoryFn, Meta } from "@storybook/react";
import {
  NotificationProvider,
  useErrorNotification,
  useNotification,
  useSuccessNotification,
} from "./Notification";
import { ButtonPrimary } from "../ButtonPrimary";

export default {
  title: "Notification",
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

export const Base: StoryFn<any> = () => {
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
Base.name = "useNotification";
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

export const Success: StoryFn<any> = () => {
  const showNotification = useSuccessNotification();
  return (
    <div className="space-x-3">
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
      <ButtonPrimary
        onClick={() => {
          showNotification({
            content: () => <div>Success</div>,
            duration: 3000,
            isClosable: true,
            confetti: true,
          });
        }}
      >
        useSuccessNotification with confetti
      </ButtonPrimary>
    </div>
  );
};
Success.name = "useSuccessNotification";
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

export const Error: StoryFn<any> = () => {
  const showNotification = useErrorNotification();
  return (
    <ButtonPrimary
      onClick={() => {
        showNotification({
          content: () => <div>Error</div>,
          duration: 3000,
          isClosable: true,
        });
      }}
    >
      useErrorNotification
    </ButtonPrimary>
  );
};
Error.name = "useErrorNotification";
Error.parameters = {
  docs: {
    source: {
      code: `
const showNotification = useErrorNotification();
showNotification({
  content: () => <div>Error</div>,
  duration: 3000,
  isClosable: true,
});
      `,
      language: "jsx",
      type: "auto",
    },
  },
};
