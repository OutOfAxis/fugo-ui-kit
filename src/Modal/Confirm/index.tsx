import { FormEvent, forwardRef, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, ModalContent, ModalFooter, ModalHeader } from "../index";
import { ButtonSecondary } from "../../ButtonSecondary";
import { ButtonSubmit } from "../../ButtonSubmit";

export const Confirm = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    footer?: ReactNode;
    confirmTitle: ReactNode;
    cancelTitle?: ReactNode | null;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: (event: FormEvent<HTMLFormElement>) => void;
    title: ReactNode;
    isValid?: boolean;
    size?: string;
    autoFocus?: boolean;
  }
>(
  (
    {
      children,
      footer,
      confirmTitle,
      cancelTitle,
      isOpen,
      onCancel,
      onConfirm,
      title,
      isValid = true,
      size = "sm:max-w-md",
      autoFocus = true,
    },
    ref
  ) => {
    const { t } = useTranslation();

    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isValid) {
        setLoading(true);
        try {
          await onConfirm(event);
        } catch (error) {
          throw error;
        } finally {
          setLoading(false);
        }
      }
    };

    return (
      <Modal isOpen={isOpen} onClose={onCancel} size={size} ref={ref}>
        {() => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex justify-center text-2xl font-bold text-gray-800">
              {title}
            </ModalHeader>
            <ModalContent className="flex flex-col justify-center">
              {children}
            </ModalContent>
            <ModalFooter className="flex items-center justify-between">
              {cancelTitle === null ? null : (
                <ButtonSecondary onClick={onCancel}>
                  {cancelTitle || t("common.cancel", "Cancel")}
                </ButtonSecondary>
              )}
              {footer}
              <ButtonSubmit
                disabled={!isValid || isLoading}
                isLoading={isLoading}
                data-testid="submit-confirmation"
                autoFocus={autoFocus}
              >
                {confirmTitle}
              </ButtonSubmit>
            </ModalFooter>
          </form>
        )}
      </Modal>
    );
  }
);
Confirm.displayName = "Confirm";
