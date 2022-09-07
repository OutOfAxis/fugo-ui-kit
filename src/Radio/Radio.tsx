import { Radio as MaterialRadio, RadioGroup } from "@material-ui/core";
import { ReactComponent as RadioCheckedIcon } from "./RadioCheckedIcon.svg";
import { ReactComponent as RadioUncheckedIcon } from "./RadioUncheckedIcon.svg";
import { forwardRef } from "react";

export { RadioGroup };

export const Radio = forwardRef<any, { value: string }>(({ value }, ref) => {
  return (
    <MaterialRadio
      ref={ref}
      value={value}
      icon={<RadioUncheckedIcon />}
      checkedIcon={<RadioCheckedIcon />}
    />
  );
});
Radio.displayName = "Radio";
