import { ComponentProps, ReactNode } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

export const Tooltip = ({
  hidden,
  label,
  children,
  side,
  sideOffset,
  align,
  alignOffset,
  className = "",
}: {
  hidden?: boolean;
  label?: ReactNode;
  children: ReactNode;
} & Pick<
  ComponentProps<typeof RadixTooltip.Content>,
  "side" | "sideOffset" | "align" | "alignOffset" | "className"
>) => {
  if (hidden || !label) {
    return <>{children}</>;
  }
  return (
    <RadixTooltip.Provider delayDuration={300}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
            className={`${className} z-[2147483001] max-w-screen-xs rounded bg-gray-900 p-2 text-sm text-gray-100 shadow-sm`}
          >
            {label}
            <RadixTooltip.Arrow className="fill-gray-900" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
