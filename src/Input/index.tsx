import {
  ChangeEvent,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  MouseEvent,
  ReactNode,
  Ref,
  SVGAttributes,
  SVGProps,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as RemoveIcon } from "./icons/remove.svg";
import { ReactComponent as CopyIcon } from "./icons/copy.svg";
import { ReactComponent as ViewOffIcon } from "./icons/view-off.svg";
import { ReactComponent as ViewOnIcon } from "./icons/view-on.svg";
import { ReactComponent as ConfirmIcon } from "./icons/confirm.svg";
import useForkRef from "@material-ui/core/utils/useForkRef";
import { div, styled } from "../styled";
import { FieldRenderProps } from "react-final-form";
import { Slot } from "@radix-ui/react-slot";
import { setInputValue } from "./setInputValue";
import { useEventCallback } from "../useEventCallback";
import { InputGroupContext, InputGroupContextType } from "./InputGroupContext";
import { copyToClipboard } from "../copyToClipboard";
import { useTemporaryState } from "../useTemporaryState";

const InputLabelStyled = styled("label")`
  block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2 text-left
`;
InputLabelStyled.displayName = "InputLabelStyled";

export const InputLabel = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => {
  const inputGroupContext = useContext(InputGroupContext);
  return (
    <InputLabelStyled
      {...props}
      htmlFor={props.htmlFor ?? inputGroupContext?.id}
      ref={ref}
    />
  );
});
InputLabel.displayName = "InputLabel";

const InputContainerStyled = div<{ "data-success"?: boolean }>`
  relative bg-white border rounded h-12
  text-gray-700 border-gray-300 focus-within:border-blue-500
  [&[aria-disabled="true"]]:text-gray-500 [&[aria-disabled="true"]]:border-gray-500 [&[aria-disabled="true"]]:bg-gray-100
  [&[aria-readonly="true"]]:text-gray-700 [&[aria-readonly="true"]]:border-gray-100 [&[aria-readonly="true"]]:bg-gray-100
  [&[aria-invalid="true"]]:text-gray-700 [&[aria-invalid="true"]]:border-red-500
  [&[data-success="true"]]:text-green-600 [&[data-success="true"]]:border-green-600
`;
InputContainerStyled.displayName = "InputContainerStyled";

export type ValueChangeEventHandler<T = Element> = (
  value: string,
  event: ChangeEvent<T>,
) => void;

export const InputEndAdornment = div`
  flex items-center pr-2 absolute right-0 h-full top-0 bottom-0 space-x-2
`;
InputEndAdornment.displayName = "InputEndAdornment";

const InputCleanAdornmentStyled = styled(
  RemoveIcon,
)`cursor-pointer text-gray-300 hover:text-gray-500 h-5`;
InputCleanAdornmentStyled.displayName = "InputCleanAdornmentStyled";

const InputCopyAdornmentStyled = styled(
  CopyIcon,
)`cursor-pointer text-gray-300 hover:text-gray-500 fill-current h-6`;
InputCopyAdornmentStyled.displayName = "InputCopyAdornmentStyled";

const InputConfirmAdornmentStyled = styled(
  ConfirmIcon,
)`text-green-600 fill-current h-6`;

export const InputAdornmentSeparator = div`border-l border-gray-300 mx-2 h-5`;
InputAdornmentSeparator.displayName = "InputAdornmentSeparator";

const InputMessageStyled = div`[&[data-state="error"]]:text-red-500 mt-1 text-sm text-gray-700`;
InputMessageStyled.displayName = "InputMessageStyled";

export const InputGroup = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> &
    Pick<
      InputHTMLAttributes<HTMLInputElement>,
      "id" | "name" | "type" | "value" | "onChange" | "disabled" | "readOnly"
    > & {
      asChild?: boolean;
      onValueChange?: ValueChangeEventHandler<HTMLInputElement>;
      error?: ReactNode | boolean;
      success?: boolean;
    }
>(
  (
    {
      asChild,
      id: idProp,
      name,
      type,
      disabled,
      readOnly,
      value,
      onChange: onChangeProp,
      onValueChange: onValueChangeProp,
      error,
      success,
      ...restProps
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [override, setOverride] = useState<
      InputHTMLAttributes<HTMLInputElement>
    >({});
    const id = useMemo(() => idProp ?? uuidv4(), [idProp]);
    const Component = asChild ? Slot : "div";
    const onChange = useEventCallback((e) => {
      onChangeProp?.(e);
      if (!e.defaultPrevented) {
        onValueChangeProp?.(e.target.value, e);
      }
    });
    return (
      <InputGroupContext.Provider
        value={useMemo(
          () => ({
            inputRef,
            id,
            input: {
              type,
              value,
              onChange,
              name,
            },
            meta: {
              dirty: Boolean(value),
              error,
              submitSucceeded: Boolean(success),
            },
            override: {
              ...override,
              disabled: disabled || override.disabled,
              readOnly: readOnly || override.readOnly,
            },
            setOverride,
          }),
          [
            id,
            type,
            value,
            name,
            error,
            success,
            override,
            disabled,
            readOnly,
            onChange,
          ],
        )}
      >
        <Component ref={ref} {...restProps} />
      </InputGroupContext.Provider>
    );
  },
);
InputGroup.displayName = "InputGroup";

export const InputGroupField = forwardRef<
  HTMLDivElement,
  FieldRenderProps<string> & {
    children?: ReactNode;
    disabled?: boolean;
    readOnly?: boolean;
    id?: string;
    asChild?: boolean;
  }
>(({ input, meta, disabled, readOnly, id, asChild, ...restProps }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [override, setOverride] = useState<
    InputHTMLAttributes<HTMLInputElement>
  >({});
  const inputId = useMemo(() => id ?? uuidv4(), [id]);
  const Component = asChild ? Slot : "div";
  return (
    <InputGroupContext.Provider
      value={useMemo(
        () => ({
          inputRef,
          id: inputId,
          input,
          meta,
          override: {
            ...override,
            disabled: disabled || override.disabled,
            readOnly: readOnly || override.readOnly,
          },
          setOverride,
        }),
        [inputId, input, meta, override, setOverride, disabled, readOnly],
      )}
    >
      <Component ref={ref} {...restProps} />
    </InputGroupContext.Provider>
  );
});
InputGroupField.displayName = "InputGroupField";

export const InputShowPasswordAdornment = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(({ "aria-checked": showPasswordProp, onClick, ...props }, ref) => {
  const inputGroupContext = useContext<
    undefined | InputGroupContextType<string, HTMLInputElement>
  >(InputGroupContext);
  if (inputGroupContext && inputGroupContext?.input.type !== "password") {
    return null;
  }
  const showPassword =
    showPasswordProp || inputGroupContext?.override.type === "text";
  const handleClick = (e: MouseEvent<SVGSVGElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) {
      return;
    }
    if (inputGroupContext) {
      if (showPassword) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { type, ...overrideRest } = inputGroupContext.override;
        inputGroupContext.setOverride(overrideRest);
      } else {
        inputGroupContext.setOverride({
          ...inputGroupContext.override,
          type: "text",
        });
      }
    }
  };
  const ViewIcon = showPassword ? ViewOnIcon : ViewOffIcon;
  return (
    <ViewIcon
      ref={ref}
      role="switch"
      {...props}
      onClick={handleClick}
      className={`${props.className || ""} cursor-pointer stroke-current ${
        showPassword
          ? "text-blue-500 hover:text-blue-200"
          : "text-gray-300 hover:text-gray-500"
      }`}
    />
  );
});
InputShowPasswordAdornment.displayName = "InputShowPasswordAdornment";

export const InputComposed = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    error?: ReactNode | boolean;
    success?: boolean;
  }
>(({ error, success, type: typeProp, ...inputProps }, outerRef) => {
  const { disabled, readOnly, value } = inputProps;
  const innerRef = useRef<HTMLInputElement>(null);
  const ref = useForkRef(innerRef, outerRef);
  const [typeOverride, setTypeOverride] = useState<string>();
  const type = typeOverride || typeProp;
  const handleShowPasswordToggle = useEventCallback(() => {
    setTypeOverride(typeOverride ? undefined : "text");
  });
  return (
    <InputContainer
      disabled={disabled}
      readOnly={readOnly}
      error={Boolean(error)}
      success={success}
    >
      <InputBase ref={ref} {...inputProps} type={type} />
      <InputEndAdornment>
        <InputCleanAdornment
          dirty={value != null ? Boolean(value) : undefined}
          inputElement={innerRef.current ?? undefined}
        />
        {typeProp === "password" ? (
          <>
            <InputAdornmentSeparator />
            <InputShowPasswordAdornment
              aria-checked={Boolean(typeOverride)}
              onClick={handleShowPasswordToggle}
            />
          </>
        ) : null}
      </InputEndAdornment>
    </InputContainer>
  );
});
InputComposed.displayName = "InputComposed";

export const InputMessage = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { errorMessage?: string }
>(({ children, errorMessage, ...props }, ref) => {
  const inputGroupContext = useContext(InputGroupContext);
  const isError = Boolean(
    inputGroupContext?.meta.touched !== false && inputGroupContext?.meta.error,
  );
  return (
    <InputMessageStyled
      ref={ref}
      {...props}
      data-state={isError ? "error" : undefined}
    >
      {errorMessage &&
      inputGroupContext?.meta.error === true &&
      inputGroupContext?.meta.touched !== false
        ? errorMessage
        : (inputGroupContext?.meta.touched !== false &&
            inputGroupContext?.meta.error) ||
          children ||
          "\u00A0"}
    </InputMessageStyled>
  );
});
InputMessage.displayName = "InputMessage";

export const InputHeader = div`text-xl mb-3`;
InputHeader.displayName = "InputHeader";

export const InputDescription = div`text-gray-600 mb-3 mt-2 text-sm`;
InputDescription.displayName = "InputDescription";

export const InputContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    success?: boolean;
  }
>(({ disabled, readOnly, error, success, ...props }, ref) => {
  const inputGroupContext = useContext(InputGroupContext);
  return (
    <InputContainerStyled
      {...props}
      ref={ref}
      aria-disabled={disabled || inputGroupContext?.override.disabled}
      aria-readonly={readOnly || inputGroupContext?.override.readOnly}
      aria-invalid={
        error ||
        Boolean(
          inputGroupContext?.meta.touched !== false &&
            inputGroupContext?.meta.error,
        )
      }
      data-success={success || Boolean(inputGroupContext?.meta.submitSucceeded)}
    />
  );
});
InputContainer.displayName = "InputContainer";

export const InputBase = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    onValueChange?: ValueChangeEventHandler<HTMLInputElement>;
  }
>(({ onChange, onValueChange, className = "", ...props }, outerRef) => {
  const inputGroupContext = useContext<
    undefined | InputGroupContextType<string, HTMLInputElement>
  >(InputGroupContext);
  const ref = useForkRef(outerRef, inputGroupContext?.inputRef ?? null);
  return (
    <input
      id={inputGroupContext?.id}
      {...inputGroupContext?.input}
      ref={ref}
      {...props}
      {...inputGroupContext?.override}
      className={`${className} h-full w-full bg-transparent px-2 align-middle outline-none`}
      onChange={(event) => {
        inputGroupContext?.input.onChange?.(event);
        onChange?.(event);
        onValueChange?.(event.target.value, event);
      }}
    />
  );
});
InputBase.displayName = "InputBase";

export const InputCleanAdornment = forwardRef<
  SVGSVGElement,
  SVGAttributes<SVGSVGElement> & {
    inputElement?: HTMLInputElement;
    dirty?: boolean;
  }
>(({ inputElement, dirty, ...props }, ref) => {
  const inputGroupContext = useContext(InputGroupContext);
  if (
    inputGroupContext?.override.disabled ||
    inputGroupContext?.override.readOnly ||
    !inputGroupContext?.input.value ||
    dirty === false
  ) {
    return null;
  }
  const inputElem = inputElement ?? inputGroupContext?.inputRef?.current;
  return (
    <InputCleanAdornmentStyled
      {...props}
      ref={ref}
      onClick={(e) => {
        props.onClick?.(e);
        if (!e.defaultPrevented && inputElem) {
          setInputValue(inputElem, "");
        }
      }}
    />
  );
});
InputCleanAdornment.displayName = "InputCleanAdornment";

export const InputCopyAdornment = forwardRef<
  SVGSVGElement,
  SVGAttributes<SVGSVGElement> & {
    inputElement?: HTMLInputElement;
  }
>(({ inputElement, ...props }, ref) => {
  const inputGroupContext = useContext(InputGroupContext);
  const inputElem = inputElement ?? inputGroupContext?.inputRef?.current;
  const value = inputElem?.value || inputGroupContext?.input.value;
  const [copied, setCopied] = useTemporaryState(3000);
  if (!value) {
    return null;
  }
  if (copied) {
    return <InputConfirmAdornmentStyled {...props} />;
  }
  return (
    <InputCopyAdornmentStyled
      {...props}
      ref={ref}
      onClick={(e) => {
        props.onClick?.(e);
        if (!e.defaultPrevented) {
          copyToClipboard(value);
          setCopied(true);
        }
      }}
    />
  );
});
InputCopyAdornment.displayName = "InputCopyAdornment";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    inputContainerRef,
    error,
    description,
    withDescription,
    isSuccess,
    label,
    type = "text",
    value,
    disabled = false,
    readOnly = false,
    inputContainerClassName = "",
    cleanable = true,
    containerClassName = "",
    icon,
    id,
    onValueChange,
    onChange,
    ...restInputProps
  }: InputProps,
  ref,
) {
  return (
    <InputGroup
      className={containerClassName}
      value={value}
      onValueChange={onValueChange}
      onChange={onChange}
      id={id}
      type={type}
      disabled={disabled}
      readOnly={readOnly}
      error={error}
      success={isSuccess}
    >
      {!!label && <InputLabel>{label}</InputLabel>}
      <InputContainer
        ref={inputContainerRef}
        className={inputContainerClassName}
      >
        <InputBase ref={ref} {...restInputProps} />
        <InputEndAdornment>
          {icon}
          {cleanable && <InputCleanAdornment />}
          <InputShowPasswordAdornment />
        </InputEndAdornment>
      </InputContainer>
      {withDescription || error ? (
        <InputMessage>{description || "\u00A0"}</InputMessage>
      ) : null}
    </InputGroup>
  );
});
Input.displayName = "Input";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputContainerRef?: Ref<HTMLDivElement>;
  /** @deprecated use `InputMessage` instead */
  description?: ReactNode;
  /** @deprecated use `InputMessage` instead */
  withDescription?: boolean;
  /** @deprecated use `InputMessage` instead */
  error?: ReactNode;
  isSuccess?: boolean;
  /** @deprecated use `InputLabel` instead */
  label?: string;
  onValueChange?: (
    value: string,
    event?: ChangeEvent<HTMLInputElement>,
  ) => void;
  inputContainerClassName?: string;
  containerClassName?: string;
  cleanable?: boolean;
  icon?: ReactNode;
};
