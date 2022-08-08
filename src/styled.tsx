import { ComponentType, forwardRef, HTMLAttributes } from "react";

export const div = (className: TemplateStringsArray) =>
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
    <div
      {...props}
      ref={ref}
      className={`${className.join(" ")} ${props.className || ""}`}
    />
  ));

export const span = (className: TemplateStringsArray) =>
  forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>((props, ref) => (
    <span
      {...props}
      ref={ref}
      className={`${className.join(" ")} ${props.className || ""}`}
    />
  ));

export const styled =
  <P extends { className?: string }>(Component: ComponentType<P>) =>
  (className: TemplateStringsArray) =>
    forwardRef<any, P>((props, ref) => (
      <Component
        {...props}
        ref={ref}
        className={`${props.className || ""} ${className.join(" ")}`}
      />
    ));
