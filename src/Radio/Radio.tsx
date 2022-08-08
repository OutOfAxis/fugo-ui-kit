import { Radio as MaterialRadio, RadioGroup } from "@material-ui/core";
import { ReactComponent as RadioCheckedIcon } from "./RadioCheckedIcon.svg";
import { ReactComponent as RadioUncheckedIcon } from "./RadioUncheckedIcon.svg";

export { RadioGroup };

export const Radio = ({ value }: { value: string }) => {
  return (
    <MaterialRadio
      value={value}
      icon={<RadioUncheckedIcon />}
      checkedIcon={<RadioCheckedIcon />}
    />
  );
};
