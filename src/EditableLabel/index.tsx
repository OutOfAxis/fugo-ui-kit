import { useState } from "react";

const EditableLabel = ({
  id,
  name,
  onNameChange,
}: {
  id: string;
  name: string;
  onNameChange?: (id: string, value: string) => any;
}) => {
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
      autoFocus
      className={`grid font-bold text-sm text-gray-700 rounded outline-none leading-snug bg-gray-100`}
      onBlur={onBlurHandler}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.key === "Enter" && onBlurHandler(event)}
      placeholder={name}
    />
  ) : (
    <div
      className={`font-bold text-sm truncate hover:cursor-text leading-snug ${
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
};
EditableLabel.displayName = "EditableLabel";

export default EditableLabel;
