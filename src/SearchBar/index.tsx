import { useState, useRef, InputHTMLAttributes } from "react";
import { ReactComponent as IconSearch } from "./icon-search.svg";
import { useIsMobile } from "../useScreenSize";

const SearchBar = ({
  onChange,
  value,
  containerClassName = "",
  foldable = true,
  ...props
}: {
  onChange: (newValue: string) => void;
  value: string;
  containerClassName?: string;
  foldable?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) => {
  const isMobile = useIsMobile();
  const [isFolded, setFolded] = useState(true);
  const input = useRef<HTMLInputElement>(null);

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
        className={`${containerClassName} flex items-center h-10 rounded-full border border-gray-300 focus-within:border-blue-500
        bg-gray-100 focus-within:bg-white
        ${
          isMobile
            ? foldable && isFolded
              ? "w-10 cursor-pointer"
              : "absolute left-5 right-5"
            : "pl-2 pr-2"
        }
      `}
      >
        <div className="bg-transparent h-full flex items-center pl-3">
          <IconSearch className="stroke-current text-gray-600" />
        </div>
        <input
          {...props}
          className={`bg-transparent p-1 pr-3 w-full h-full outline-none ${
            isMobile && foldable && isFolded ? "ml-4" : ""
          }`}
          onChange={(event) => onChange(event.target.value)}
          onBlur={handleDismiss}
          value={value}
          ref={input}
        />
      </div>
    </div>
  );
};
export default SearchBar;
