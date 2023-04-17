import { CSSProperties, forwardRef, ReactNode } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import "./styles.css";
import { isFunction } from "lodash";
import { div } from "../styled";

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

export const ModalHeader = div`px-4 sm:px-6 pt-10 pb-1`;
ModalHeader.displayName = "ModalHeader";

export const ModalContent = div`sm:flex-0 flex-1 py-4 px-4 sm:px-6`;
ModalContent.displayName = "ModalContent";

export const ModalFooter = div`rounded-b-lg border-t border-gray-300 bg-gray-100 py-6 pl-4 pr-24 sm:pl-6 sm:pr-6`;
ModalFooter.displayName = "ModalFooter";
