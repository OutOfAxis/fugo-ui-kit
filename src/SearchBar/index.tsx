import { useState, useRef, InputHTMLAttributes, forwardRef } from "react";
import { ReactComponent as IconSearch } from "./icon-search.svg";
import { useIsMobile } from "../useScreenSize";
import useForkRef from "@material-ui/core/utils/useForkRef";

export const SearchBar = forwardRef<
  HTMLInputElement,
  {
    onChange: (newValue: string) => void;
    value: string;
    containerClassName?: string;
    foldable?: boolean;
  } & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">
>(
  (
    { onChange, value, containerClassName = "", foldable = true, ...props },
    outerRef
  ) => {
    const isMobile = useIsMobile();
    const [isFolded, setFolded] = useState(true);
    const input = useRef<HTMLInputElement>(null);
    const ref = useForkRef(outerRef, input);

    const handleClick = () => {
      if (!isMobile) return;
      setFolded(false);
      input.current?.focus();
    };

    const handleDismiss = () => {
      setFolded(true);
    };

    return (
      <div className={`h-10 ${isMobile && "w-10"}`}>
        <div
          onClick={handleClick}
          className={`${containerClassName} flex h-10 items-center rounded-full border border-gray-300 bg-gray-100
        focus-within:border-blue-500 focus-within:bg-white
        ${
          isMobile
            ? foldable && isFolded
              ? "w-10 cursor-pointer"
              : "absolute left-5 right-5"
            : "pl-2 pr-2"
        }
      `}
        >
          <div className="flex h-full items-center bg-transparent pl-3">
            <IconSearch className="stroke-current text-gray-600" />
          </div>
          <input
            {...props}
            className={`h-full w-full bg-transparent p-1 pr-3 outline-none ${
              isMobile && foldable && isFolded ? "ml-4" : ""
            }`}
            onChange={(event) => onChange(event.target.value)}
            onBlur={handleDismiss}
            value={value}
            ref={ref}
          />
        </div>
      </div>
    );
  }
);
SearchBar.displayName = "SearchBar";
