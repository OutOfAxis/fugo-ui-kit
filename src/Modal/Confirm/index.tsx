import { FormEvent, forwardRef, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "../index";
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
            <div className="flex justify-center px-7 pb-2 pt-10 text-2xl font-bold text-gray-800">
              {title}
            </div>
            <div className="sm:flex-0 flex flex-1 flex-col justify-center px-7 pt-2 pb-6">
              {children}
            </div>
            <div className="mx-auto border-b border-gray-200" />
            <div className="flex items-center justify-between rounded-b-lg bg-gray-100 p-6 pr-24 lg:pr-6">
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
            </div>
          </form>
        )}
      </Modal>
    );
  }
);
Confirm.displayName = "Confirm";
