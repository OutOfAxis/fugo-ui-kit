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
  const handleKeyDown = useEventCallback((e) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) {
      return;
    }
    if (value == null) {
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newValue = value - step;
      handleValueChange(newValue);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newValue = value + step;
      handleValueChange(newValue);
    }
  });
  const handleChange = useEventCallback((event) => {
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
  });
  return {
    formattedValue,
    handleChange,
    handleKeyDown,
    handleValueChange,
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
  const { formattedValue, handleKeyDown, handleChange } = useNumberInput({
    value,
    onChange: props.onChange,
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
    />
  );
};
NumberInputBase.displayName = "NumberInputBase";

export const NumberInput = ({
  value,
  onValueChange,
  step = 1,
  validate,
  precision = 1,
  isPositive,
  disabled,
  noSteps = false,
  ...props
}: Omit<
  ComponentProps<typeof InputBase>,
  "value" | "onValueChange" | "step"
> & {
  value: number;
  onValueChange: (newValue: number) => void;
  step?: number;
  validate?: (newValue: number) => boolean;
  precision?: number;
  isPositive?: boolean;
  disabled?: boolean;
  noSteps?: boolean;
}) => {
  const [rawValue, setRawValue] = useState<string>(
    (value / precision).toString()
  );
  useEffect(() => {
    setRawValue((value / precision).toString());
  }, [precision, value]);
  const { value: formattedValue, onChange: onFormattedChange } = useRifm({
    accept: /[\d.]/g,
    format: (v) => formatFloatingPointNumber(v, 2),
    onChange: setRawValue,
    value: rawValue,
  });
  const handleChange = (newValue: number) => {
    if (isNaN(newValue)) {
      return;
    }
    if (isPositive && newValue < 0) {
      return;
    }
    if (validate && !validate(newValue)) {
      return;
    }
    onValueChange(newValue);
  };
  return (
    <div className="flex space-x-3">
      {noSteps ? null : (
        <ButtonPrimary
          disabled={disabled}
          className="h-10 w-10 font-bold text-2xl"
          onClick={() => handleChange(value - step)}
        >
          -
        </ButtonPrimary>
      )}
      <InputContainer disabled={disabled} className="flex-1 h-10">
        <InputBase
          {...props}
          disabled={disabled}
          className="text-center"
          value={formattedValue}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              handleChange(value - step);
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              handleChange(value + step);
            }
          }}
          onValueChange={(newValueRaw, event) => {
            if (event) {
              onFormattedChange(event);
            }
            try {
              const newValue = parseNumber(newValueRaw, 2);
              if (isNaN(newValue)) {
                return;
              }
              if (isPositive && newValue < 0) {
                return;
              }
              if (validate && !validate(newValue)) {
                return;
              }
              handleChange(newValue * precision);
            } catch (error) {
              // ignore invalid number input
            }
          }}
        />
      </InputContainer>
      {noSteps ? null : (
        <ButtonPrimary
          disabled={disabled}
          className="h-10 w-10 font-bold text-2xl"
          onClick={() => handleChange(value + step)}
        >
          +
        </ButtonPrimary>
      )}
    </div>
  );
};
NumberInput.displayName = "NumberInput";
