import { ComponentStoryFn, Meta } from "@storybook/react";
import { ButtonPlaceholder, TextPlaceholder } from "./index";

export default {
  title: "SkeletonElements",
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
  },
} as Meta;

export const ButtonPlaceholderStory: ComponentStoryFn<
  typeof ButtonPlaceholder
> = (props) => {
  return <ButtonPlaceholder {...props} />;
};
ButtonPlaceholderStory.storyName = "ButtonPlaceholder";
ButtonPlaceholderStory.args = {
  rounded: false,
  width: 100,
};

export const TextPlaceholderStory: ComponentStoryFn<typeof TextPlaceholder> = (
  props
) => {
  return (
    <div className="space-y-4">
      <TextPlaceholder {...props} />
      <TextPlaceholder {...props} />
      <TextPlaceholder {...props} />
    </div>
  );
};
TextPlaceholderStory.storyName = "TextPlaceholder";
TextPlaceholderStory.args = {
  min: 40,
  max: 120,
};
