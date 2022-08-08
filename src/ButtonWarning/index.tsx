import Button, { ButtonProps } from "../Button";

function ButtonWarning({ className = "", ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className={`${className} border border-red-600 bg-red-100 text-red-600 hover:bg-red-200 !font-bold`}
    />
  );
}

export default ButtonWarning;
