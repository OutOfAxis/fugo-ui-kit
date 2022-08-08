import { FormEvent, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../index";
import ButtonSecondary from "../../ButtonSecondary";
import ButtonSubmit from "../../ButtonSubmit";

const Confirm = ({
  children,
  footer,
  confirmTitle,
  isOpen,
  onCancel,
  onConfirm,
  title,
  isValid = true,
  size = "sm:max-w-md",
  autoFocus = true,
}: {
  children: ReactNode;
  footer?: ReactNode;
  confirmTitle: ReactNode;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (event: FormEvent<HTMLFormElement>) => void;
  title: ReactNode;
  isValid?: boolean;
  size?: string;
  autoFocus?: boolean;
}) => {
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
    <Modal isOpen={isOpen} onClose={onCancel} size={size}>
      {() => (
        <form onSubmit={handleSubmit}>
          <div className="px-7 pb-2 pt-10 text-gray-800 text-2xl font-bold flex justify-center">
            {title}
          </div>
          <div className="px-7 pt-2 pb-6 flex justify-center flex-col flex-1 sm:flex-0">
            {children}
          </div>
          <div className="border-b border-gray-200 mx-auto" />
          <div className="flex justify-between items-center bg-gray-100 rounded-b-lg p-6 pr-24 lg:pr-6">
            <ButtonSecondary onClick={onCancel}>
              {t("common.cancel", "Cancel")}
            </ButtonSecondary>
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
};

export default Confirm;
