import {
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./index.module.css";
import useForkRef from "@material-ui/core/utils/useForkRef";

export interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  small?: boolean;
  extraSmall?: boolean;
  isLoading?: boolean;
  autoFocus?: boolean;
}

export const ButtonLoader = () => {
  return (
    <span className={`ml-1 tracking-wider ${styles.pulse}`}>
      <b>·</b>
      <b>·</b>
      <b>·</b>
    </span>
  );
};
ButtonLoader.displayName = "ButtonLoader";

const PROCESSING_TIMEOUT = 3000;

export const Button = forwardRef<HTMLDivElement, ButtonProps>(
  (
    {
      children,
      className = "",
      onClick = undefined,
      disabled = false,
      small = false,
      extraSmall = false,
      isLoading,
      ...props
    },
    outerRef
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useForkRef(outerRef, innerRef);

    useEffect(() => {
      if (props.autoFocus) {
        innerRef.current?.focus();
      }
    }, [props.autoFocus]);
    const [isProcessing, setIsProcessing] = useState(isLoading);
    const [isDisabledByProcessing, setIsDisabledByProcessing] = useState(false);
    useEffect(() => {
      setIsProcessing(isLoading);
    }, [isLoading]);
    useEffect(() => {
      if (isDisabledByProcessing) {
        const timeoutId = setTimeout(() => {
          setIsDisabledByProcessing(false);
        }, PROCESSING_TIMEOUT);
        return () => {
          clearTimeout(timeoutId);
        };
      }
    }, [isDisabledByProcessing]);
    const handleClick = async (e: MouseEvent<HTMLDivElement>) => {
      if (disabled || !onClick || isDisabledByProcessing) {
        return;
      }
      try {
        setIsDisabledByProcessing(true);
        const clickResult = onClick(e);
        if (isLoading == null && (clickResult as any)?.then) {
          setIsProcessing(true);
          await clickResult;
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsProcessing(false);
        setIsDisabledByProcessing(false);
      }
    };
    return (
      <div
        ref={ref}
        {...props}
        className={`inline-block ${
          small
            ? `h-10 py-2 px-3 font-semibold`
            : extraSmall
            ? `h-6 py-0.5 px-2.5 text-sm font-bold`
            : `h-12 py-3 px-4 font-semibold`
        } select-none whitespace-nowrap rounded leading-none focus:shadow-lg focus:outline-none ${className}`}
        onClick={handleClick}
        onKeyDown={(e) =>
          e.key === "Enter" ? handleClick(e as any) : undefined
        }
        role="button"
        tabIndex={props.autoFocus ? -1 : undefined}
      >
        <div className="flex-cols flex h-full items-center justify-center">
          {children}
          {isProcessing && <ButtonLoader />}
        </div>
      </div>
    );
  }
);
Button.displayName = "Button";
