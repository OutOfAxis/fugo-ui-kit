import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Portal from "@reach/portal";
import { ReactComponent as CloseIcon } from "./CloseIcon.svg";
import { useEventCallback } from "../useEventCallback";
import { v4 as uuid } from "uuid";

const animationDuration = 300;

type NotificationContextValue = ({
  content,
  duration,
  isClosable,
}: {
  content: (props: NotificationContentProps) => ReactNode;
  duration?: number;
  isClosable?: boolean;
}) => void;

type NotificationContentProps = {
  isOpen: boolean;
  duration?: number;
  onClose: () => void;
  isClosable?: boolean;
};

const NotificationContext = createContext<NotificationContextValue>(() => {});

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const useSuccessNotification = (): NotificationContextValue => {
  const createNotification = useNotification();
  return useCallback(
    ({ content, ...rest }) =>
      createNotification({
        ...rest,
        content: (props) => (
          <SuccessNotificationContent {...props}>
            {content(props)}
          </SuccessNotificationContent>
        ),
      }),
    [createNotification]
  );
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<{
    isOpen: boolean;
    queue: Array<{
      id: string;
      content: (props: NotificationContentProps) => ReactNode;
      duration?: number;
      isClosable: boolean;
    }>;
  }>({
    isOpen: false,
    queue: [],
  });
  const currentItem = state.queue[0];
  const { id, content, duration, isClosable } = currentItem || {};
  const handleOpen = useEventCallback(
    ({
      content,
      duration,
      isClosable = true,
    }: {
      content: (props: NotificationContentProps) => ReactNode;
      duration?: number;
      isClosable?: boolean;
    }) => {
      setState((state) => ({
        isOpen: true,
        queue: [...state.queue, { id: uuid(), content, duration, isClosable }],
      }));
    }
  );
  const handleClose = useCallback(async () => {
    setState((state) => ({ ...state, isOpen: false }));
    await new Promise((resolve) => setTimeout(resolve, animationDuration));
    setState(({ queue: [, ...rest] }) => ({
      isOpen: rest.length > 0,
      queue: rest,
    }));
  }, []);
  return (
    <NotificationContext.Provider value={handleOpen}>
      <Notification
        key={id}
        isOpen={state.isOpen}
        onClose={handleClose}
        duration={duration}
      >
        {content
          ? content({
              isOpen: state.isOpen,
              onClose: handleClose,
              duration,
              isClosable,
            })
          : null}
      </Notification>
      {children}
    </NotificationContext.Provider>
  );
};
NotificationProvider.displayName = "NotificationProvider";

const SuccessNotificationContent = ({
  onClose,
  children,
  isClosable = false,
}: NotificationContentProps & { children: ReactNode }) => {
  return (
    <div className="relative max-w-screen-2/3 w-full p-6 bg-green-100 border border-green-300 rounded-t text-green-600 font-extrabold">
      {children}
      {isClosable ? (
        <CloseIcon
          onClick={onClose}
          className="absolute right-3 top-6 cursor-pointer"
        />
      ) : null}
    </div>
  );
};
SuccessNotificationContent.displayName = "SuccessNotificationContent";

const Notification = ({
  isOpen,
  onClose,
  duration,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
  children: ReactNode;
}) => {
  const [height, setHeight] = useState(1000);
  useEffect(() => {
    if (isOpen && duration) {
      const timeout = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, onClose, duration]);
  return (
    <Portal>
      <div
        ref={(elem) => {
          if (elem && elem.offsetHeight !== height) {
            setHeight(elem.offsetHeight);
          }
        }}
        className="fixed w-full text-center flex justify-center transition-all duration-300 z-in-modal"
        style={{ bottom: isOpen ? 0 : -height }}
      >
        {children}
      </div>
    </Portal>
  );
};
Notification.displayName = "Notification";
