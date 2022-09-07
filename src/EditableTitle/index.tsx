import { forwardRef, InputHTMLAttributes, useRef } from "react";
import useForkRef from "@material-ui/core/utils/useForkRef";

const useFocusOnceRef = () => {
  const isFocused = useRef(false);
  return (elem: HTMLInputElement) => {
    if (elem && !isFocused.current) {
      isFocused.current = true;
      elem.focus();
    }
  };
};

export const EditableTitle = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    onChange: (newValue: string) => void;
  }
>(({ className = "", onChange, ...props }, outerRef) => {
  const focusRef = useFocusOnceRef();
  const ref = useForkRef(outerRef, focusRef);
  return (
    <input
      {...props}
      ref={ref}
      className={`${className} text-gray-700 font-semibold ml-3 px-3`}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
});
EditableTitle.displayName = "EditableTitle";
