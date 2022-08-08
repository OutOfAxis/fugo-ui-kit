import Button, { ButtonProps } from "../Button";

function ButtonSecondary({
  children,
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled}
      className={`${
        disabled
          ? `bg-gray-200 text-gray-500`
          : `bg-white hover:bg-gray-300 text-gray-700`
      } !font-bold border border-gray-500 ${className}`}
    >
      {children}
    </Button>
  );
}

export default ButtonSecondary;
