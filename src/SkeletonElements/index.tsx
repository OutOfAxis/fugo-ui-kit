import { random } from "lodash";
import skeletonStyles from "./thumbnail-skeleton.module.css";
import { forwardRef } from "react";
import { div } from "../styled";

export const TextPlaceholder = forwardRef<
  HTMLDivElement,
  { min?: number; max?: number } & React.HTMLAttributes<HTMLDivElement>
>(({ min = 40, max = 120, className = "", style, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={`${className} relative h-3 overflow-hidden rounded-full bg-gray-200 transition-all duration-500 ${skeletonStyles.wave}`}
    style={{ ...style, width: random(min, max) }}
  />
));
TextPlaceholder.displayName = "TextPlaceholder";

export const ButtonPlaceholder = div`h-8 bg-gray-200 transition-all duration-500 rounded relative overflow-hidden ${() =>
  skeletonStyles.wave}`;
ButtonPlaceholder.displayName = "ButtonPlaceholder";
