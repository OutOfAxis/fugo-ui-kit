import Portal from "@reach/portal";
import { useTranslation } from "react-i18next";
import { SnackbarProps } from "./types";
import { ReactComponent as IconRemove } from "./remove.svg";
import styles from "./index.module.css";

export const Snackbar = ({
  isOpen,
  message,
  onUndo,
  onClose,
  buttonTitle,
}: SnackbarProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;
  return (
    <Portal>
      <div
        className={`flex items-center justify-between bg-gray-800
         p-4 rounded-lg absolute bottom-0 left-0 ml-4 mb-4 text-sm ${styles.show}`}
      >
        <div className="pr-1 text-gray-300">{message}</div>
        <div className="flex items-center">
          {onUndo && (
            <div
              className="cursor-pointer text-blue-400 stroke-current hover:text-blue-300 px-2"
              onClick={onUndo}
            >
              {buttonTitle || t("components.snackbar.undo", "Undo")}
            </div>
          )}
          <IconRemove
            className="cursor-pointer text-gray-200 stroke-current hover:text-gray-400"
            onClick={onClose}
          />
        </div>
      </div>
    </Portal>
  );
};
Snackbar.displayName = "Snackbar";
