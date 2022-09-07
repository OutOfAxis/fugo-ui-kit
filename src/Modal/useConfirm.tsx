import { ReactNode, useRef, useState } from "react";
import { usePortal } from "../Portal/usePortal";
import { Confirm } from "./Confirm";

export type ConfirmModalProps = {
  title: ReactNode;
  description: ReactNode;
  actionName: ReactNode;
};

export const useConfirmModal = (): ((
  props: ConfirmModalProps
) => Promise<boolean>) => {
  const createPortal = usePortal();
  return ({ title, description, actionName }) =>
    createPortal<boolean>(({ onClose }) => (
      <Confirm
        isOpen
        title={title}
        confirmTitle={actionName}
        onConfirm={() => onClose(true)}
        onCancel={() => onClose(false)}
      >
        {description}
      </Confirm>
    ));
};

export const useConfirm = <T extends unknown = boolean, ConfirmData = any>(
  onConfirm?: Function
): [
  T | false,
  (data?: T) => Promise<ConfirmData | null>,
  () => void,
  (...args: any) => void
] => {
  const [data, setData] = useState<T | false>(false);

  const resolveRef = useRef<(data: ConfirmData | null) => void>(() => {});

  const handleOpen = (data?: T) => {
    const promise = new Promise<ConfirmData | null>((resolve) => {
      resolveRef.current = resolve;
    });
    if (data == null) {
      setData(true as any);
    } else {
      setData(data);
    }
    return promise;
  };
  const handleClose = () => {
    resolveRef.current(null);
    setData(false);
  };

  const handleConfirm = async (...args: any[]) => {
    // @ts-expect-error
    resolveRef.current(...args);
    if (data == null) {
      return;
    }
    if (onConfirm) {
      await onConfirm.apply(this, data === true ? args : [data, ...args]);
    }
    setData(false);
  };

  return [data, handleOpen, handleClose, handleConfirm];
};
