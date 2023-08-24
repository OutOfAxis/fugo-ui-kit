import { SingleDatePicker } from "./DatePicker";
import { Meta, StoryFn } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

const Component = SingleDatePicker;
(Component as any).displayName = "DatePicker";

type CaseFn = StoryFn<typeof Component>;

export default {
  component: Component,
  argTypes: {
    onChange: {
      type: "function",
    },
    onIsOpenChange: {
      type: "function",
    },
    onFocus: {
      type: "function",
    },
    startWeekDay: {
      control: {
        type: "radio",
        options: ["monday", "sunday"],
      },
    },
  },
} as Meta<typeof Component>;

export const Base: CaseFn = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <Component
      {...props}
      onIsOpenChange={(isOpen) => {
        props?.onIsOpenChange(isOpen);
        setArgs({ ...args, isOpen: !args.isOpen });
      }}
      onChange={(startDate) => {
        props?.onChange(startDate);
        setArgs({ ...args, startDate });
      }}
    />
  );
};
Base.name = "DatePicker";
Base.args = {
  startDatePlaceholder: "Date input placeholder",
  startDate: new Date("2022-08-10"),
  minDate: new Date("2022-08-09"),
  maxDate: new Date("2022-08-20"),
  isOpen: false,
  disabled: false,
  startWeekDay: "monday",
  dateFormat: "dd/MM/yyyy",
  highlightToday: true,
  monthFormat: "MMMM yyyy",
};
