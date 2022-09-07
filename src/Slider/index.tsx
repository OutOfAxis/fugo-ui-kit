import { ComponentProps, forwardRef, useEffect, useState } from "react";
import { Slider as ReachSlider } from "@reach/slider";
import "@reach/slider/styles.css";
import styles from "./index.module.css";
import { useThrottledCallback } from "use-debounce";

export const Slider = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof ReachSlider>
>(({ className = "", ...props }, ref) => {
  return (
    <ReachSlider
      ref={ref}
      {...props}
      className={`${className} ${styles.slider}`}
    />
  );
});
Slider.displayName = "Slider";

export const SliderThrottled = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof ReachSlider> & { throttle?: number }
>(({ onChange, value, throttle = 150, ...props }, ref) => {
  const [newValue, setNewValue] = useState(value);
  useEffect(() => {
    setNewValue(value);
  }, [value]);
  const handleSave = useThrottledCallback((newValue: number, props: any) => {
    if (onChange) {
      onChange(newValue, props);
    }
  }, throttle);
  const handleChange = (newValue: number, props: any) => {
    setNewValue(newValue);
    handleSave(newValue, props);
  };
  return (
    <Slider ref={ref} {...props} value={newValue} onChange={handleChange} />
  );
});
SliderThrottled.displayName = "SliderThrottled";

export const SliderPercentLabeled = forwardRef<
  HTMLDivElement,
  {
    label?: string;
    className?: string;
    value?: number;
    onChange: (newValue: number) => void;
    disabled?: boolean;
  }
>(({ label, className = "", value, onChange, disabled = false }, ref) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold tracking-widest text-gray-700 uppercase">
          {label}
        </div>
        <div className="font-bold text-2xs">
          {Math.round((value || 1) * 100)}%
        </div>
      </div>
      <div className="mt-1">
        <Slider
          ref={ref}
          value={value || 1}
          max={1}
          step={0.01}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
});
SliderPercentLabeled.displayName = "SliderPercentLabeled";

export const SliderSideValue = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    value?: number;
    onChange: (newValue: number) => void;
    min?: number;
    max: number;
  }
>(({ className, value, onChange, min = 0, max }, ref) => {
  return (
    <div className={`${className} flex items-center`}>
      <div className="flex-1 pl-2">
        <Slider
          ref={ref}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
        />
      </div>
      <div className="pl-2 font-bold text-sm text-gray-700">{value}</div>
    </div>
  );
});
SliderSideValue.displayName = "SliderSideValue";
