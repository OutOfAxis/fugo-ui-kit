import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { Confetti } from "./index";
import { ButtonPrimary } from "../ButtonPrimary";
import { useRef } from "react";

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
  const confettiRef = useRef<any>(null);
  return (
    <div>
      <ButtonPrimary
        onClick={() => {
          confettiRef.current?.trigger();
        }}
      >
        Toggle animation
      </ButtonPrimary>
      <Confetti ref={confettiRef} imperative {...props} />
    </div>
  );
};

Base.storyName = "Confetti";
