import { ComponentProps, ElementRef, ElementType, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

export const styled =
  <C extends ElementType>(Component: C) =>
  <ExtraProps extends {} = {}>(
    className: TemplateStringsArray,
    ...parts: Array<(props: ComponentProps<C> & ExtraProps) => string>
  ) =>
    forwardRef<
      ElementRef<C>,
      ComponentProps<C> & ExtraProps & { asChild?: boolean }
    >((props, ref) => {
      const { asChild, ...restProps } = props;
      const ComponentToRender = asChild ? (Slot as any) : Component;
      return (
        <ComponentToRender
          {...restProps}
          ref={ref}
          className={`
            ${className.join(" ")}
            ${props.className || ""}
            ${parts.map((part) => part(props)).join(" ")}
          `}
        />
      );
    });

export const div = styled("div");

export const span = styled("span");
