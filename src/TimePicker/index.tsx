import { forwardRef, useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { isMobile } from "react-device-detect";
import { isValid } from "date-fns";
import { InputBase, InputContainer } from "../Input";
import { ReactComponent as TimeIcon } from "./icons/time.svg";
import "./index.css";

const defaultMaterialTheme = createTheme({
  typography: {
    fontFamily: "inherit",
  },
  palette: {
    primary: {
      main: "#4263EB",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#f05252",
    },
  },
});

const fixEndOfDayTime = (time: string) => (time === "00:00" ? "24:00" : time);

const revertEndOfDayTime = (time: string) =>
  time === "24:00" ? "00:00" : time;

const MobileTimePicker = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange }, ref) => {
    const handleChange = (newValue: string | null | undefined) => {
      onChange(newValue && fixEndOfDayTime(newValue));
    };
    return (
      <InputContainer>
        <InputBase
          ref={ref}
          type="time"
          value={(value && revertEndOfDayTime(value)) || ""}
          onValueChange={handleChange}
        />
      </InputContainer>
    );
  }
);
MobileTimePicker.displayName = "MobileTimePicker";

function getTimeString(date: Date) {
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

const DesktopTimePicker = forwardRef<any, Props>(
  ({ value, onChange, ampm = true }, ref) => {
    const [dateValue, setDateValue] = useState<Date | null | undefined>(
      value ? new Date(`2020-01-01T${value}`) : null
    );
    const handleChange = (date: Date | null) => {
      setDateValue(date);
      if (date === null) {
        onChange(null);
        return;
      }
      if (isValid(date)) {
        onChange(getTimeString(date));
      }
    };
    return (
      <div className="time-picker">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={defaultMaterialTheme}>
            <KeyboardTimePicker
              ref={ref}
              inputVariant="outlined"
              ampm={ampm}
              mask={ampm ? "__:__ _M" : "__:__"}
              value={dateValue}
              onChange={handleChange}
              keyboardIcon={<TimeIcon />}
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
);
DesktopTimePicker.displayName = "DesktopTimePicker";

export const TimePicker = forwardRef<any, Props>((props, ref) => {
  if (isMobile) {
    return <MobileTimePicker {...props} ref={ref} />;
  }
  return <DesktopTimePicker {...props} ref={ref} />;
});
TimePicker.displayName = "TimePicker";

export interface Props {
  /** Time in the format "13:59" */
  value: string | null | undefined;
  onChange: (value: string | null | undefined) => void;
  ampm?: boolean;
}
