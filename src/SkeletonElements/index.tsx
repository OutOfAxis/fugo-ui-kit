import { random } from "lodash";
import skeletonStyles from "./thumbnail-skeleton.module.css";
import { forwardRef } from "react";

export const TextPlaceholder = forwardRef<
  HTMLDivElement,
  { min?: number; max?: number }
>(({ min = 40, max = 120 }, ref) => (
  <div
    ref={ref}
    className={`bg-gray-200 h-3 transition-all duration-500 rounded-full relative overflow-hidden ${skeletonStyles.wave}`}
    style={{ width: random(min, max) }}
  />
));
TextPlaceholder.displayName = "TextPlaceholder";

export const ButtonPlaceholder = forwardRef<
  HTMLDivElement,
  {
    rounded?: boolean;
    width?: number;
  }
>(({ rounded = false, width = 80 }, ref) => (
  <div
    ref={ref}
    className={`bg-gray-200 h-8 transition-all duration-500 rounded${
      rounded ? "-full" : ""
    } relative overflow-hidden ${skeletonStyles.wave}`}
    style={{ width }}
  />
));
ButtonPlaceholder.displayName = "ButtonPlaceholder";
