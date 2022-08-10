import { ComponentMeta, ComponentStoryObj, StoryFn } from "@storybook/react";
import {
  ContentCard,
  CardCheckbox,
  CardDate,
  CardName,
  getAspectRatioStyle,
} from "./ContentCard";
import { useArgs } from "@storybook/client-api";
import { ChangeEvent, MouseEvent, ReactNode } from "react";

const Component = ContentCard;

type Case = ComponentStoryObj<typeof Component>;

export default {
  component: Component,
  decorators: [(Story) => <div className="flex">{Story()}</div>],
  subcomponents: {
    CardCheckbox,
    CardDate,
    CardName,
  },
} as ComponentMeta<typeof Component>;

export const Base: Case = {
  args: {
    preview: <img src="https://placebear.com/g/200/300" alt="" />,
    children: <>Some bears</>,
  },
};

export const WithCheckbox: StoryFn<{
  value: boolean;
  onChange: (e: ChangeEvent) => void;
  onClick: (e: MouseEvent) => void;
  name: string;
}> = ({ value, onChange, onClick, name }) => {
  const [args, setArgs] = useArgs();
  return (
    <Component
      preview={<img src="https://placebear.com/g/200/300" alt="" />}
      onClick={(e) => {
        setArgs({ ...args, value: !args.value });
        onClick?.(e);
      }}
    >
      <CardCheckbox
        value={value}
        onChange={(e) => {
          setArgs({ ...args, value: e.target.checked });
          onChange?.(e);
        }}
      />
      <CardName>{name}</CardName>
    </Component>
  );
};
WithCheckbox.argTypes = {
  onChange: {
    type: "function",
  },
  onClick: {
    type: "function",
  },
};
WithCheckbox.args = {
  name: "Argh!",
  value: false,
};

export const WithDate: StoryFn<{
  date: number;
  preview: ReactNode;
  name: string;
}> = ({ preview, name, date }) => {
  return (
    <Component preview={preview}>
      <CardName>{name}</CardName>
      <CardDate date={date} />
    </Component>
  );
};
WithDate.args = {
  date: new Date("2022-08-10").getTime(),
  preview: <img src="https://placebear.com/g/200/300" alt="" />,
  name: "Bear",
};
WithDate.argTypes = {
  date: {
    control: "date",
  },
};

export const WithAspectRatio: StoryFn<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  return (
    <Component
      className="w-60"
      preview={
        <div
          style={getAspectRatioStyle({ width, height })}
          className="overflow-hidden"
        >
          <img
            src="https://placebear.com/g/200/300"
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
          />
        </div>
      }
    >
      <CardName>Bear</CardName>
    </Component>
  );
};
WithAspectRatio.args = {
  width: 1920,
  height: 1080,
};
