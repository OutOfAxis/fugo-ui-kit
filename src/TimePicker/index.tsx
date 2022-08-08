import { useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { isMobile } from "react-device-detect";
import { isValid } from "date-fns";
import Input from "../Input";
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

function MobileTimePicker({ value, onChange }: Props) {
  const handleChange = (newValue: string | null | undefined) => {
    onChange(newValue && fixEndOfDayTime(newValue));
  };
  return (
    <Input
      type="time"
      value={(value && revertEndOfDayTime(value)) || ""}
      onValueChange={handleChange}
      className="flex"
      cleanable={false}
    />
  );
}

function getTimeString(date: Date) {
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

function DesktopTimePicker({ value, onChange, ampm = true }: Props) {
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

export default function TimePicker(props: Props) {
  if (isMobile) {
    return <MobileTimePicker {...props} />;
  }
  return <DesktopTimePicker {...props} />;
}

interface Props {
  /** Time in format "13:59" */
  value: string | null | undefined;
  onChange: (value: string | null | undefined) => void;
  ampm?: boolean;
}
