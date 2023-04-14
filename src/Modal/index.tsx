import { CSSProperties, forwardRef, ReactNode } from "react";
import { ModalHeader } from "./ModalHeader";
import { ModalContent } from "./ModalContent";
import { ModalFooter } from "./ModalFooter";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import "./styles.css";
import { isFunction } from "lodash";

export const Modal = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode | (() => ReactNode);
    isOpen: boolean;
    onClose: () => void;
    size?: string;
    className?: string;
    style?: CSSProperties;
  }
>(
  (
    { children, isOpen, onClose, size = "", className = "", style = {} },
    ref
  ) => {
    return (
      <DialogOverlay
        ref={ref}
        isOpen={isOpen}
        onDismiss={onClose}
        dangerouslyBypassFocusLock // Modal scroll jumps to bottom without this
      >
        <DialogContent
          className={`${className} flex w-screen flex-col bg-white p-0 shadow-lg sm:w-auto sm:rounded-lg ${
            size || "default-modal-width"
          }`}
          aria-label="Dialog"
          style={style}
        >
          {isFunction(children) ? children() : children}
        </DialogContent>
      </DialogOverlay>
    );
  }
);
Modal.displayName = "Modal";

export { ModalHeader, ModalContent, ModalFooter };
