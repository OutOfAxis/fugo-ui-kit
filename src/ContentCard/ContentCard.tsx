import {
  ComponentProps,
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import { div } from "../styled";
import format from "date-fns/format";
import RoundedCard from "../RoundedCard";
import Checkbox from "../Checkbox";

export const getAspectRatioStyle = ({
  width = 1920,
  height = 1080,
}: { width?: number; height?: number } = {}): CSSProperties => ({
  position: "relative",
  paddingBottom: `${((height / width) * 100).toFixed(2)}%`,
});

export const CardCheckbox = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Checkbox>
>((props, ref) => {
  return (
    <Checkbox
      {...props}
      ref={ref}
      className={`${props.className || ""} absolute top-2 left-2`}
    />
  );
});
CardCheckbox.displayName = "CardCheckbox";

export const CardName = div`font-bold text-sm truncate leading-snug`;
CardName.displayName = "CardName";

export const CardDate = forwardRef<
  HTMLDivElement,
  { date: number } & HTMLAttributes<HTMLDivElement>
>(({ date, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={`${props.className || ""} text-sm text-gray-500`}
    >
      {format(date, "PP")}
    </div>
  );
});
CardDate.displayName = "CardDate";

export const ContentCard = forwardRef<
  HTMLDivElement,
  {
    preview: ReactNode;
    children: ReactNode;
  } & HTMLAttributes<HTMLDivElement>
>(({ preview, children, ...props }, ref) => {
  return (
    <RoundedCard
      {...props}
      ref={ref}
      className={`flex flex-col cursor-pointer select-none relative ${
        props.className || ""
      }`}
    >
      <div className="relative h-full bg-white">{preview}</div>
      <div className="p-2 bg-white">{children}</div>
    </RoundedCard>
  );
});
ContentCard.displayName = "ContentCard";
