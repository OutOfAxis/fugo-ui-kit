import { styled } from "../styled";
import { ReactComponent as PremiumIconSvg } from "./PremiumIcon.svg";
import { ReactComponent as PremiumIconBoxSvg } from "./PremiumIconBox.svg";

export { PremiumIconSvg, PremiumIconBoxSvg };

export const PremiumIcon = styled(
  PremiumIconSvg
)`absolute -top-3 m-auto bottom-3 -right-2 text-orange-400`;
PremiumIcon.displayName = "PremiumIcon";

export const PremiumIconBox = styled(
  PremiumIconBoxSvg
)`absolute top-1 right-1 text-orange-400`;
PremiumIconBox.displayName = "PremiumIconBox";
