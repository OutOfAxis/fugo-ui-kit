import { Button } from "../Button";
import { forwardRef } from "react";

export const Switcher = forwardRef<
  HTMLSpanElement,
  {
    value: string;
    onChange: (newValue: string) => void;
    options: Array<{
      value: string;
      label: string;
    }>;
  }
>(({ value, onChange, options }, ref) => {
  const buttonStyle =
    "rounded-r-none first:rounded-l-md rounded-l-none last:rounded-r-md first:ml-0 -ml-px font-semibold relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 transition ease-in-out duration-150";

  function handleClick(newValue: string) {
    if (newValue === value) return;
    onChange(newValue);
  }

  return (
    <span ref={ref} className="relative z-0 inline-flex shadow-sm rounded-md">
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={`${buttonStyle} ${
            option.value === value ? "bg-blue-500 text-white" : "text-gray-700"
          }`}
        >
          {option.label}
        </Button>
      ))}
    </span>
  );
});
Switcher.displayName = "Switcher";
