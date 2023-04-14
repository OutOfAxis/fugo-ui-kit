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
        className={`relative inline-block h-6 w-11 flex-shrink-0 rounded-full
        border-2 border-transparent ${
          disabled ? "" : "cursor-pointer"
        } focus:shadow-outline
        transition-colors duration-200 ease-in-out focus:outline-none ${
          value ? "bg-green-400" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full
          bg-white shadow-sm transition duration-200 ease-in-out ${
            value ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
      {label && (
        <p
          className={`ml-1.5 text-sm font-semibold text-gray-700 ${labelClassName} ${
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
