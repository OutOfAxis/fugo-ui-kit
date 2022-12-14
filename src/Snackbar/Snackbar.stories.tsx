import { ComponentStoryFn, Meta } from "@storybook/react";
import { useSnackbar, SnackbarProvider } from "./SnackbarService";
import { ButtonPrimary } from "../ButtonPrimary";

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
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
} as Meta;

export const Base: ComponentStoryFn<any> = () => {
  const showSnackbar = useSnackbar();
  return (
    <ButtonPrimary
      onClick={() => {
        showSnackbar({
          onClose: () => {
            console.log("closed");
          },
          buttonTitle: "Undo",
          message: "Something happened",
          onUndo: () => {
            console.log("Undo");
          },
          timeout: 5000,
        });
      }}
    >
      useSnackbar
    </ButtonPrimary>
  );
};
Base.storyName = "useSnackbar";
Base.parameters = {
  docs: {
    source: {
      language: "jsx",
      type: "code",
    },
  },
};
