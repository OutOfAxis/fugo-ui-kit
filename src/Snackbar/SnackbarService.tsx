import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Snackbar } from "./index";
import { useEventCallback } from "../useEventCallback";

const TIMEOUT_DEFAULT = 7000;

type SnackbarContextProps = {
  onUndo?: () => void;
  buttonTitle?: string;
  message: string;
  onClose?: () => void;
  timeout?: number;
};

type SnackbarContextValue = (props: SnackbarContextProps) => void;

const defaultSnackbarContextValue: SnackbarContextValue = () => {
  console.error(
    "Snackbar compound components cannot be rendered outside the Snackbar component"
  );
};

const SnackbarContext = createContext<SnackbarContextValue>(
  defaultSnackbarContextValue
);

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarProps, setSnackbarProps] =
    useState<SnackbarContextProps | null>(null);
  const handleOpen = useEventCallback((props: SnackbarContextProps) => {
    if (snackbarProps && snackbarProps.onClose) {
      snackbarProps.onClose();
    }
    setSnackbarProps(props);
  });
  const handleClose = useCallback(() => {
    if (snackbarProps?.onClose) {
      snackbarProps.onClose();
    }
    setSnackbarProps(null);
  }, [snackbarProps]);
  useEffect(() => {
    if (snackbarProps == null) {
      return;
    }
    const timeoutId = setTimeout(() => {
      handleClose();
    }, snackbarProps?.timeout || TIMEOUT_DEFAULT);
    return () => clearTimeout(timeoutId);
  }, [handleClose, snackbarProps]);
  const handleUndo = useCallback(() => {
    snackbarProps?.onUndo?.();
    setSnackbarProps(null);
  }, [snackbarProps]);
  return (
    <SnackbarContext.Provider value={handleOpen}>
      {children}
      {snackbarProps ? (
        <Snackbar
          isOpen
          message={snackbarProps.message}
          buttonTitle={snackbarProps.buttonTitle}
          onClose={handleClose}
          onUndo={snackbarProps?.onUndo && handleUndo}
        />
      ) : null}
    </SnackbarContext.Provider>
  );
};
SnackbarProvider.displayName = "SnackbarProvider";
