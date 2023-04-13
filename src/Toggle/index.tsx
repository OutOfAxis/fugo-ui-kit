import { forwardRef, ReactNode } from "react";

export const Toggle = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    label?: ReactNode;
    value?: boolean;
    disabled?: boolean;
    onChange: (value: boolean) => void;
    labelClassName?: string;
  }
>(
  (
    {
      className = "",
      label = "",
      value,
      disabled = false,
      onChange,
      labelClassName = "",
    },
    ref
  ) => (
    <div
      ref={ref}
      className={`${className} flex items-center ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <span
        onClick={
          disabled
            ? undefined
            : () => {
                onChange(!value);
              }
        }
        data-testid="toggler"
        className={`relative inline-block flex-shrink-0 h-6 w-11 border-2
        border-transparent rounded-full ${
          disabled ? "" : "cursor-pointer"
        } transition-colors
        ease-in-out duration-200 focus:outline-none focus:shadow-outline ${
          value ? "bg-green-400" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white
          shadow-sm transform transition ease-in-out duration-200 ${
            value ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
      {label && (
        <p
          className={`ml-1.5 font-semibold text-sm text-gray-700 ${labelClassName} ${
            disabled ? "" : "cursor-pointer"
          }`}
          onClick={
            disabled
              ? undefined
              : () => {
                  onChange(!value);
                }
          }
        >
          {label}
        </p>
      )}
    </div>
  )
);
Toggle.displayName = "Toggle";
