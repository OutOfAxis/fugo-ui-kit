import { forwardRef, useState } from "react";

export const EditableLabel = forwardRef<
  any,
  {
    id: string;
    name: string;
    onNameChange?: (id: string, value: string) => any;
  }
>(({ id, name, onNameChange }, ref) => {
  const [isEditMode, setIsEditingMode] = useState(false);

  const onBlurHandler = (event?: any) => {
    if (!onNameChange) {
      return;
    }
    onNameChange(id, event.target.value || name);
    setIsEditingMode(false);
  };

  return isEditMode && onNameChange ? (
    <input
      ref={ref}
      autoFocus
      className={`grid rounded bg-gray-100 text-sm font-bold leading-snug text-gray-700 outline-none`}
      onBlur={onBlurHandler}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.key === "Enter" && onBlurHandler(event)}
      placeholder={name}
    />
  ) : (
    <div
      ref={ref}
      className={`truncate text-sm font-bold leading-snug hover:cursor-text ${
        onNameChange && "cursor-text"
      }`}
      onClick={(e) => {
        if (!!onNameChange) {
          e.stopPropagation();
          setIsEditingMode(true);
        }
      }}
      title={name}
    >
      {name}
    </div>
  );
});
EditableLabel.displayName = "EditableLabel";
