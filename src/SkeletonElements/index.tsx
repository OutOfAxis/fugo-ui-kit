import { random } from "lodash";
import skeletonStyles from "./thumbnail-skeleton.module.css";
import { forwardRef } from "react";

export const TextPlaceholder = forwardRef<
  HTMLDivElement,
  { min?: number; max?: number }
>(({ min = 40, max = 120 }, ref) => (
  <div
    ref={ref}
    className={`relative h-3 overflow-hidden rounded-full bg-gray-200 transition-all duration-500 ${skeletonStyles.wave}`}
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
    className={`h-8 bg-gray-200 transition-all duration-500 rounded${
      rounded ? "-full" : ""
    } relative overflow-hidden ${skeletonStyles.wave}`}
    style={{ width }}
  />
));
ButtonPlaceholder.displayName = "ButtonPlaceholder";
