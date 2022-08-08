import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import {
  Slider,
  SliderThrottled,
  SliderSideValue,
  SliderPercentLabeled,
} from "./index";
import { useArgs } from "@storybook/client-api";
import { SliderOrientation } from "@reach/slider";

const Component = Slider;

type CaseFn = ComponentStoryFn<typeof Component>;

export default {
  component: Component,
  parameters: {
    viewMode: "story",
    docs: {
      description: {
        component: ``,
      },
    },
  },
  args: {},
  argTypes: {
    onChange: {
      type: "function",
    },
  },
} as ComponentMeta<typeof Component>;

export const Base: CaseFn = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <Slider
      {...props}
      onChange={(value) => {
        props.onChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
Base.storyName = Component.name;
Base.args = {
  className: "w-60",
  value: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  orientation: SliderOrientation.Horizontal,
};
Base.argTypes = {
  orientation: {
    control: {
      type: "radio",
      options: [SliderOrientation.Horizontal, SliderOrientation.Vertical],
    },
  },
};

export const SliderThrottledStory: ComponentStoryFn<typeof SliderThrottled> = (
  props
) => {
  const [args, setArgs] = useArgs();
  return (
    <SliderThrottled
      {...props}
      onChange={(value) => {
        props.onChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
SliderThrottledStory.storyName = "SliderThrottled";
SliderThrottledStory.args = {
  throttle: 150,
  ...Base.args,
};
SliderThrottledStory.argTypes = Base.argTypes;

export const SliderSideValueStory: ComponentStoryFn<typeof SliderSideValue> = (
  props
) => {
  const [args, setArgs] = useArgs();
  return (
    <SliderSideValue
      {...props}
      onChange={(value) => {
        props.onChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
SliderSideValueStory.storyName = "SliderSideValue";
SliderSideValueStory.args = {
  className: "w-60",
  value: 0,
  min: 0,
  max: 100,
};

export const SliderPercentLabeledStory: ComponentStoryFn<
  typeof SliderPercentLabeled
> = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <SliderPercentLabeled
      {...props}
      onChange={(value) => {
        props.onChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
SliderPercentLabeledStory.storyName = "SliderPercentLabeled";
SliderPercentLabeledStory.args = {
  label: "Slider label",
  className: "w-60",
  value: 0,
  disabled: false,
};
