import {
  ChangeEventHandler,
  ComponentProps,
  InputHTMLAttributes,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { ButtonPrimary } from "../ButtonPrimary";
import { InputBase, InputContainer } from "../Input";
import { useRifm } from "rifm";
import { useEventCallback } from "../useEventCallback";

const getNumberRegex = (min?: number, fractionDigits?: number) => {
  return new RegExp(
    `[\\d${fractionDigits ? "." : ""}${min == null || min < 0 ? "-" : ""}]+`
  );
};

const parseNumber = (value: string, fractionDigits: number, min?: number) => {
  const parsed = (value.match(getNumberRegex(min, fractionDigits)) || []).join(
    ""
  );
  const [head, tail] = parsed.split(".");
  const scaledTail = tail != null ? tail.slice(0, fractionDigits) : "";
  return Number.parseFloat(`${head}.${scaledTail}`);
};

const formatFloatingPointNumber = (
  value: string,
  fractionDigits: number,
  min?: number
) => {
  const parsed = (value.match(getNumberRegex(min, fractionDigits)) || []).join(
    ""
  );
  const [head, tail] = parsed.split(".");
  const scaledTail = tail != null ? tail.slice(0, fractionDigits) : "";
  const number = Number.parseFloat(`${head}.${scaledTail}`);
  if (Number.isNaN(number)) {
    return "";
  }
  const formatted = number.toString();
  if (parsed.includes(".")) {
    const [formattedHead] = formatted.split(".");
    const formattedTail =
      scaledTail !== "" && scaledTail[fractionDigits - 1] === "0"
        ? scaledTail.slice(0, -1)
        : scaledTail;
    return `${formattedHead}.${formattedTail}`;
  }
  return formatted;
};

export const numberPrecisionLens = ({
  value,
  onValueChange,
  precision,
}: {
  value: number;
  onValueChange: (newValue: number) => void;
  precision: number;
}) => ({
  value: value / precision,
  onValueChange: (newValue: number) => onValueChange(newValue * precision),
});

const useNumberInput = ({
  value,
  onChange,
  onValueChange,
  step = 1,
  onKeyDown,
  min,
  max,
  fractionDigits = 2,
}: {
  value?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onValueChange: (newValue: number) => void;
  step?: number;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  min?: number;
  max?: number;
  fractionDigits?: number;
}) => {
  const [rawValue, setRawValue] = useState<string | undefined>(
    value != null ? value.toString() : undefined
  );
  useEffect(() => {
    setRawValue((rawValue) =>
      value != null &&
      value !== parseNumber(rawValue ?? "", fractionDigits, min)
        ? value.toString()
        : rawValue
    );
  }, [fractionDigits, min, value]);
  const { value: formattedValue, onChange: onFormattedChange } = useRifm({
    accept: getNumberRegex(min, fractionDigits),
    format: useEventCallback((v) =>
      formatFloatingPointNumber(v, fractionDigits, min)
    ),
    onChange: setRawValue,
    value: rawValue ?? "",
  });
  const handleValueChange = useEventCallback((newValue: number) => {
    if (isNaN(newValue)) {
      return;
    }
    if (min != null && newValue < min) {
      return;
    }
    if (max != null && newValue > max) {
      return;
    }
    onValueChange(newValue);
  });
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> =
    useEventCallback((event) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) {
        return;
      }
      if (value == null) {
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const newValue = value - step;
        handleValueChange(newValue);
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        const newValue = value + step;
        handleValueChange(newValue);
      }
    });
  const handleChange: ChangeEventHandler<HTMLInputElement> = useEventCallback(
    (event) => {
      onChange?.(event);
      if (event.defaultPrevented) {
        return;
      }
      onFormattedChange(event);
      try {
        const newValue = parseNumber(
          event.currentTarget.value,
          fractionDigits,
          min
        );
        handleValueChange(newValue);
      } catch (error) {
        // ignore invalid number input
      }
    }
  );
  const handleInvalidValueReset = useEventCallback(() => {
    setRawValue((rawValue) =>
      value != null &&
      value !== parseNumber(rawValue ?? "", fractionDigits, min)
        ? value.toString()
        : rawValue
    );
  });
  return {
    formattedValue,
    handleChange,
    handleKeyDown,
    handleValueChange,
    handleInvalidValueReset,
  };
};

export const NumberInputBase = ({
  value,
  onValueChange,
  step = 1,
  onKeyDown,
  min,
  max,
  fractionDigits = 2,
  onChange,
  onBlur,
  ...props
}: Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "min" | "max" | "step"
> & {
  value?: number;
  onValueChange: (newValue: number) => void;
  step?: number;
  fractionDigits?: number;
  min?: number;
  max?: number;
}) => {
  const {
    formattedValue,
    handleKeyDown,
    handleChange,
    handleInvalidValueReset,
  } = useNumberInput({
    value,
    onChange,
    onValueChange,
    step,
    onKeyDown,
    min,
    max,
    fractionDigits,
  });
  return (
    <input
      {...props}
      value={formattedValue}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      onBlur={(event) => {
        onBlur?.(event);
        if (event.defaultPrevented) {
          return;
        }
        handleInvalidValueReset();
      }}
    />
  );
};
NumberInputBase.displayName = "NumberInputBase";

export const NumberInput = ({
  value,
  onValueChange,
  step = 1,
  onKeyDown,
  min,
  max,
  fractionDigits = 2,
  disabled,
  noSteps = false,
  onChange,
  className = "",
  onBlur,
  ...props
}: Omit<
  ComponentProps<typeof InputBase>,
  "value" | "onValueChange" | "step" | "min" | "max"
> & {
  value: number;
  onValueChange: (newValue: number) => void;
  step?: number;
  noSteps?: boolean;
  min?: number;
  max?: number;
  fractionDigits?: number;
}) => {
  const {
    formattedValue,
    handleChange,
    handleKeyDown,
    handleValueChange,
    handleInvalidValueReset,
  } = useNumberInput({
    value,
    onValueChange,
    step,
    onKeyDown,
    min,
    max,
    fractionDigits,
    onChange,
  });
  return (
    <div className="flex space-x-3">
      {noSteps ? null : (
        <ButtonPrimary
          disabled={disabled}
          className="h-10 w-10 font-bold text-2xl"
          onClick={() => handleValueChange(value - step)}
        >
          -
        </ButtonPrimary>
      )}
      <InputContainer disabled={disabled} className="flex-1 h-10">
        <InputBase
          {...props}
          disabled={disabled}
          className={`${className} text-center`}
          value={formattedValue}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onBlur={(event) => {
            onBlur?.(event);
            if (event.defaultPrevented) {
              return;
            }
            handleInvalidValueReset();
          }}
        />
      </InputContainer>
      {noSteps ? null : (
        <ButtonPrimary
          disabled={disabled}
          className="h-10 w-10 font-bold text-2xl"
          onClick={() => handleValueChange(value + step)}
        >
          +
        </ButtonPrimary>
      )}
    </div>
  );
};
NumberInput.displayName = "NumberInput";
