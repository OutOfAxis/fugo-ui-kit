import {
  useState,
  forwardRef,
  LabelHTMLAttributes,
  Ref,
  ReactNode,
  ChangeEvent,
  useMemo,
  useRef,
  InputHTMLAttributes,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as Remove } from "./icons/remove.svg";
import { ReactComponent as ViewOff } from "./icons/view-off.svg";
import { ReactComponent as ViewOn } from "./icons/view-on.svg";
import useForkRef from "@material-ui/core/utils/useForkRef";

const setInputValue = (input: HTMLInputElement, value: string) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )?.set;
  nativeInputValueSetter?.call(input, value);
  input.dispatchEvent(
    new Event("change", {
      bubbles: true,
      cancelable: true,
    })
  );
};

export const InputLabel = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      {...props}
      className={`${
        props.className || ""
      } block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-2 text-left`}
    />
  );
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    inputContainerRef,
    error,
    description,
    withDescription,
    isSuccess,
    label,
    onChange,
    onValueChange,
    placeholder,
    type = "text",
    value,
    disabled = false,
    className = "",
    inputContainerClassName = "",
    cleanable = true,
    containerClassName = "",
    icon,
    heightClassName = "h-12",
    ...restInputProps
  }: InputProps,
  outerRef
) {
  const internalRef = useRef<HTMLInputElement>(null);
  const ref = useForkRef(internalRef, outerRef);
  const [isOn, setOn] = useState(false);
  const ViewIcon = isOn ? ViewOn : ViewOff;
  const isPassword = type === "password";
  const id = useMemo(() => uuidv4(), []);
  return (
    <div className={`flex flex-col ${containerClassName}`}>
      {!!label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <div
        ref={inputContainerRef}
        className={`${inputContainerClassName} ${heightClassName} relative bg-white border rounded ${
          disabled
            ? "text-gray-500 border-gray-500 bg-gray-100"
            : error
            ? "text-red-600 border-red-600"
            : isSuccess
            ? "text-green-600 border-green-600"
            : "border-gray-500 focus-within:border-blue-500"
        }`}
      >
        <input
          ref={ref}
          id={id}
          className={`${className} h-full w-full inline-block outline-none px-2 align-middle bg-transparent`}
          onChange={(event) => {
            if (onChange) {
              onChange(event);
            }
            if (onValueChange) {
              onValueChange(event.target.value, event);
            }
          }}
          placeholder={placeholder}
          type={isOn ? "text" : type}
          value={value}
          disabled={disabled}
          {...restInputProps}
        />
        <div className="flex items-center pr-2 absolute right-0 h-full top-0 bottom-0">
          {icon}
          {!disabled && cleanable && !!value && (
            <Remove
              className="cursor-pointer text-gray-300 hover:text-gray-500 stroke-current h-5"
              onClick={() => {
                if (internalRef.current) {
                  setInputValue(internalRef.current, "");
                }
              }}
            />
          )}
          {isPassword && <div className="border-l border-gray-300 mx-2 h-5" />}
          {isPassword && (
            <ViewIcon
              className={`cursor-pointer stroke-current ${
                isOn
                  ? "text-blue-500 hover:text-blue-200"
                  : "text-gray-300 hover:text-gray-500"
              }`}
              onClick={() => setOn(!isOn)}
            />
          )}
        </div>
      </div>
      {withDescription ? (
        <small className="font-bold mt-1 uppercase text-2xs text-gray-700">
          {error || description || "\u00A0"}
        </small>
      ) : null}
    </div>
  );
});

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  inputContainerRef?: Ref<HTMLDivElement>;
  description?: ReactNode;
  withDescription?: boolean;
  error?: ReactNode;
  isSuccess?: boolean;
  label?: string;
  onValueChange?: (
    value: string,
    event?: ChangeEvent<HTMLInputElement>
  ) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  value: string;
  disabled?: boolean;
  className?: string;
  inputContainerClassName?: string;
  containerClassName?: string;
  heightClassName?: string;
  cleanable?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  icon?: ReactNode;
};

export default Input;
