import React, { useState, ReactNode } from "react";
import DateRangePicker from "./DateRangePicker";
import DatePicker from "./DatePicker";
import SquareCheckbox from "../Checkbox/SquareCheckbox";

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

export default function SwitchableDatePicker({
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
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
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
        <div className="ml-2 font-bold text-sm">No End Date</div>
      </label>
      <label className="flex items-center ml-8">
        <SquareCheckbox
          disabled={disabled}
          value={isWeekScheduleEnabled}
          onChange={handleWeekScheduleToggle}
        />
        <div className="ml-2 font-bold text-sm">Week Schedule</div>
      </label>
    </div>
  );

  if (hasEndDate) {
    return (
      <DateRangePicker
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
      </DateRangePicker>
    );
  }
  return (
    <DatePicker
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
    </DatePicker>
  );
}
SwitchableDatePicker.displayName = "SwitchableDatePicker";
