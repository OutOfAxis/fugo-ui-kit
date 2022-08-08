export interface SnackbarProps {
  isOpen: boolean;
  buttonTitle?: string;
  message: string;
  onClose: () => void;
  onUndo?: () => void;
}
