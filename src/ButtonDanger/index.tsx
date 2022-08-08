import Button, { ButtonProps } from "../Button";

function ButtonDanger({ className = "", ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className={`${className} bg-red-600 text-white hover:bg-red-400 font-bold`}
    />
  );
}

export default ButtonDanger;
