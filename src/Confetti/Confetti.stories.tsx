import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { Confetti } from "./index";
import { useState } from "react";
import { ButtonPrimary } from "../ButtonPrimary";

const Component = Confetti;

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
  const [animated, setAnimated] = useState(true);
  return (
    <div>
      <ButtonPrimary onClick={() => setAnimated(!animated)}>
        Toggle animation
      </ButtonPrimary>
      <Confetti animated={animated} {...props} />
    </div>
  );
};
Base.storyName = "Confetti";
