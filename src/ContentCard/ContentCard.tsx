import {
  ComponentProps,
  CSSProperties,
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

export const CardCheckbox = (props: ComponentProps<typeof Checkbox>) => {
  return (
    <Checkbox
      {...props}
      className={`${props.className || ""} absolute top-2 left-2`}
    />
  );
};

export const CardName = div`font-bold text-sm truncate leading-snug`;

export const CardDate = ({
  date,
  ...props
}: { date: number } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={`${props.className || ""} text-sm text-gray-500`}
    >
      {format(date, "PP")}
    </div>
  );
};

export const ContentCard = ({
  preview,
  children,
  ...props
}: {
  preview: ReactNode;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <RoundedCard
      {...props}
      className={`flex flex-col cursor-pointer select-none relative ${
        props.className || ""
      }`}
    >
      <div className="relative h-full bg-white">{preview}</div>
      <div className="p-2 bg-white">{children}</div>
    </RoundedCard>
  );
};
