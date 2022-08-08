import Button, { ButtonProps } from "../Button";

function ButtonSecondaryAlt({
  children,
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled}
      className={`bg-white ${
        disabled ? `text-gray-500` : `text-gray-700`
      } !font-bold border border-transparent ${
        disabled ? `` : `hover:border-gray-500`
      } ${className}`}
    >
      {children}
    </Button>
  );
}

export default ButtonSecondaryAlt;
