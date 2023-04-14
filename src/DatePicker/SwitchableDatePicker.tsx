import React, {
  useState,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from "react";
import { RangeDatePicker } from "./DateRangePicker";
import { SingleDatePicker } from "./DatePicker";
import { SquareCheckbox } from "../Checkbox/SquareCheckbox";

interface Props {
  disabled?: boolean;
  isWeekScheduleEnabled: boolean;
  onWeekScheduleToggle: (newValue: boolean) => void;
  minDate?: Date;
  startDate: Date | null;
  endDate: Date | null;
  onChange: (startDate: Date | null, endDate: Date | null) => void;
  hasEndDate: boolean;
  onHasEndDateChange: (hasEndDate: boolean) => void;
  dialogTargetOffset?: string;
  rangeInputsRender?: ({
    startDateInput,
    endDateInput,
    topBar,
  }: {
    startDateInput: ReactNode;
    endDateInput: ReactNode;
    topBar: React.ReactNode;
  }) => ReactNode;
}

type SwitchableDatePickerRef = {
  setOpen: (isOpen: boolean) => void;
};

export const SwitchableDatePicker = forwardRef<SwitchableDatePickerRef, Props>(
  (
    {
      disabled,
      isWeekScheduleEnabled,
      onWeekScheduleToggle,
      minDate,
      startDate,
      endDate,
      onChange,
      hasEndDate,
      onHasEndDateChange,
      rangeInputsRender,
      dialogTargetOffset,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    useImperativeHandle(
      ref,
      () => {
        return {
          setOpen: (v) => setIsOpen(v),
        };
      },
      []
    );
    const toggleHasEndDate = () => {
      if (hasEndDate && endDate != null) {
        onChange(startDate, null);
      }
      onHasEndDateChange(!hasEndDate);
    };
    const handleWeekScheduleToggle = () => {
      onWeekScheduleToggle(!isWeekScheduleEnabled);
    };
    const handleSingleDateChange = (startDate: Date) => {
      onChange(startDate, null);
    };
    const switchElem = (
      <div className="flex">
        <label className="flex items-center md:ml-8">
          <SquareCheckbox
            disabled={disabled}
            value={!hasEndDate}
            onChange={toggleHasEndDate}
          />
          <div className="ml-2 text-sm font-bold">No End Date</div>
        </label>
        <label
          className={`ml-8 items-center ${isOpen ? "hidden xs:flex" : "flex"}`}
        >
          <SquareCheckbox
            disabled={disabled}
            value={isWeekScheduleEnabled}
            onChange={handleWeekScheduleToggle}
          />
          <div className="ml-2 text-sm font-bold">Week Schedule</div>
        </label>
      </div>
    );

    if (hasEndDate) {
      return (
        <RangeDatePicker
          disabled={disabled}
          minDate={minDate}
          isOpen={isOpen}
          onIsOpenChange={setIsOpen}
          topBar={switchElem}
          startDate={startDate as Date}
          endDate={endDate as Date}
          onChange={onChange}
          startDatePlaceholder="-- / -- / ----"
          endDatePlaceholder="-- / -- / ----"
          dialogTargetOffset={dialogTargetOffset}
        >
          {rangeInputsRender}
        </RangeDatePicker>
      );
    }
    return (
      <SingleDatePicker
        disabled={disabled}
        minDate={minDate}
        isOpen={isOpen}
        onIsOpenChange={setIsOpen}
        topBar={switchElem}
        startDate={startDate as Date}
        onChange={handleSingleDateChange}
        startDatePlaceholder="-- / -- / ----"
        dialogTargetOffset={dialogTargetOffset}
      >
        {rangeInputsRender}
      </SingleDatePicker>
    );
  }
);
SwitchableDatePicker.displayName = "SwitchableDatePicker";
