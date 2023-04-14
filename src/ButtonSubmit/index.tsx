import React, { forwardRef } from "react";
import { useBrandTheme } from "../useBrand";
import { ButtonLoader } from "../Button";

export const ButtonSubmit = forwardRef<
  HTMLButtonElement,
  {
    isLoading?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const {
    children,
    isLoading = false,
    disabled,
    className = "",
    ...restProps
  } = props;
  const getClassName = useBrandTheme("ButtonSubmit");
  const defaultTheme = disabled
    ? "text-white bg-gray-500"
    : "text-white bg-purple-600 hover:bg-purple-900";

  const classes = getClassName?.(props) ?? defaultTheme;

  return (
    <button
      {...restProps}
      ref={ref}
      className={`${className} inline-block rounded py-3 px-4 font-bold focus:shadow-lg focus:outline-none ${classes}`}
    >
      <div className="flex-cols flex h-full items-center justify-center">
        {children}
        {isLoading && <ButtonLoader />}
      </div>
    </button>
  );
});
ButtonSubmit.displayName = "ButtonSubmit";
