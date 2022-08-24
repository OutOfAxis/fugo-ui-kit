import { forwardRef } from "react";
import Button, { ButtonProps } from "../Button";

export const ButtonPrimary = forwardRef<HTMLDivElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      disabled,
      className,
      isLoading,
      onClick = () => {},
      ...restProps
    } = props;

    const classes = disabled
      ? "bg-gray-500 hover:bg-gray-500"
      : "bg-purple-600 hover:bg-purple-700";

    return (
      <Button
        ref={ref}
        {...restProps}
        onClick={disabled ? undefined : onClick}
        className={`text-white ${classes} ${className}`}
        disabled={disabled}
        isLoading={isLoading}
      >
        {children}
      </Button>
    );
  }
);
ButtonPrimary.displayName = "ButtonPrimary";

export default ButtonPrimary;
