import { random } from "lodash";
import skeletonStyles from "./thumbnail-skeleton.module.css";

export const TextPlaceholder = ({ min = 40, max = 120 }) => (
  <div
    className={`bg-gray-200 h-3 transition-all duration-500 rounded-full relative overflow-hidden ${skeletonStyles.wave}`}
    style={{ width: random(min, max) }}
  />
);

export const ButtonPlaceholder = ({ rounded = false, width = 80 }) => (
  <div
    className={`bg-gray-200 h-8 transition-all duration-500 rounded${
      rounded ? "-full" : ""
    } relative overflow-hidden ${skeletonStyles.wave}`}
    style={{ width }}
  />
);
