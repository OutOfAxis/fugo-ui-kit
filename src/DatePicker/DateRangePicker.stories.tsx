import DateRangePicker from "./DateRangePicker";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { useArgs } from "@storybook/client-api";

const Component = DateRangePicker;
(Component as any).displayName = "DateRangePicker";

type CaseFn = ComponentStoryFn<typeof Component>;

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
} as ComponentMeta<typeof Component>;

export const Base: CaseFn = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <Component
      {...props}
      onIsOpenChange={(isOpen) => {
        props?.onIsOpenChange(isOpen);
        setArgs({ ...args, isOpen: !args.isOpen });
      }}
      onChange={(startDate, endDate) => {
        props?.onChange(startDate, endDate);
        setArgs({ ...args, startDate, endDate });
      }}
    />
  );
};
Base.storyName = "DateRangePicker";
Base.args = {
  startDatePlaceholder: "Date input placeholder",
  startDate: new Date("2022-08-10"),
  endDatePlaceholder: "End date input placeholder",
  endDate: new Date("2022-08-12"),
  minDate: new Date("2022-08-09"),
  maxDate: new Date("2022-08-20"),
  isOpen: false,
  disabled: false,
  startWeekDay: "monday",
  dateFormat: "dd/MM/yyyy",
  highlightToday: true,
  monthFormat: "MMMM yyyy",
};
