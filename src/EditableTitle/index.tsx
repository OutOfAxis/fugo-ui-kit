import { InputHTMLAttributes, useRef } from "react";

const useFocusOnceRef = () => {
  const isFocused = useRef(false);
  return (elem: HTMLInputElement) => {
    if (elem && !isFocused.current) {
      isFocused.current = true;
      elem.focus();
    }
  };
};

export default function EditableTitle({
  className = "",
  onChange,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  onChange: (newValue: string) => void;
}) {
  const focusRef = useFocusOnceRef();
  return (
    <input
      {...props}
      ref={focusRef}
      className={`${className} text-gray-700 font-semibold ml-3 px-3`}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
}
EditableTitle.displayName = "EditableTitle";
