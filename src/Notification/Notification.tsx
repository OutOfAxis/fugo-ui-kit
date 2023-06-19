import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Portal } from "@radix-ui/react-portal";
import { ReactComponent as CloseIcon } from "./CloseIcon.svg";
import { useEventCallback } from "../useEventCallback";
import { v4 as uuid } from "uuid";
import { Confetti, ConfettiRef } from "../Confetti";
import { useRef } from "react";
import { Countdown, useCountdown } from "../useCountdown";
import "animate.css";

const animationDuration = 500;

type ContentFn = (props: NotificationContentProps) => ReactNode;

type NotificationContextValue = ({
  content,
  duration,
  isClosable,
  confetti,
}: {
  content: ContentFn;
  duration?: number;
  isClosable?: boolean;
  confetti?: boolean;
}) => void;

type NotificationContentProps = {
  isOpen: boolean;
  duration?: number;
  onClose: () => void;
  isClosable?: boolean;
  countdown: Countdown;
};

const NotificationContext = createContext<NotificationContextValue | null>(
  null
);

export const useNotification = () => {
  const fn = useContext(NotificationContext);
  if (fn == null) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return fn;
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

export const useErrorNotification = (): NotificationContextValue => {
  const createNotification = useNotification();
  return useCallback(
    ({ content, ...rest }) =>
      createNotification({
        ...rest,
        content: (props) => (
          <ErrorNotificationContent {...props}>
            {content(props)}
          </ErrorNotificationContent>
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
      content: ContentFn;
      duration?: number;
      isClosable: boolean;
      confetti?: boolean;
    }>;
  }>({
    isOpen: false,
    queue: [],
  });
  const currentItem = state.queue[0];
  const handleOpen = useEventCallback(
    ({
      content,
      duration,
      isClosable = true,
      confetti = false,
    }: {
      content: ContentFn;
      duration?: number;
      isClosable?: boolean;
      confetti?: boolean;
    }) => {
      setState((state) => ({
        isOpen: true,
        queue: [
          ...state.queue,
          { id: uuid(), content, duration, isClosable, confetti },
        ],
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
  const confettiRef = useRef<ConfettiRef>(null);
  useEffect(() => {
    if (currentItem?.confetti) {
      confettiRef.current?.trigger();
    }
  }, [currentItem]);
  return (
    <NotificationContext.Provider value={handleOpen}>
      {currentItem ? (
        <Notification
          key={currentItem.id}
          isOpen={state.isOpen}
          onClose={handleClose}
          duration={currentItem.duration}
          content={currentItem.content}
          isClosable={currentItem.isClosable}
        />
      ) : null}
      <Confetti ref={confettiRef} imperative className="z-in-modal" />
      {children}
    </NotificationContext.Provider>
  );
};
NotificationProvider.displayName = "NotificationProvider";

const NotificationProgressBar = ({
  duration,
  countdown,
  className = "bg-green-400",
}: {
  duration?: number;
  countdown: Countdown;
  className?: string;
}) => {
  if (!duration || countdown.value == null) {
    return null;
  }
  return (
    <div
      className={`${className} ${
        countdown.isPaused ? "opacity-30" : ""
      } absolute bottom-0 left-0 h-1 rounded-r-full transition-all duration-300 ease-linear`}
      style={{
        width: `${(1 - countdown.value / duration) * 100}%`,
      }}
    />
  );
};

const BasicNotificationContent = ({
  children,
  isOpen,
  isClosable,
  onClose,
  countdown,
  duration,
  className = "",
  progressBarClassName,
}: NotificationContentProps & {
  children: ReactNode;
  className?: string;
  progressBarClassName?: string;
}) => {
  return (
    <div
      className={`${className} ${
        isOpen ? "animate__bounceInUp" : "animate__fadeOutDown"
      } animate__animated relative mb-8 w-full max-w-screen-2/3 overflow-hidden rounded-lg py-5 px-7`}
    >
      <div className="space-y-2">{children}</div>
      {isClosable ? (
        <CloseIcon
          onClick={onClose}
          className="absolute top-3 right-3 h-4 w-4 cursor-pointer text-gray-600"
        />
      ) : null}
      <NotificationProgressBar
        className={progressBarClassName}
        countdown={countdown}
        duration={duration}
      />
    </div>
  );
};

const SuccessNotificationContent = (
  props: NotificationContentProps & { children: ReactNode }
) => {
  return <BasicNotificationContent {...props} className="bg-green-200" />;
};
SuccessNotificationContent.displayName = "SuccessNotificationContent";

const ErrorNotificationContent = (
  props: NotificationContentProps & { children: ReactNode }
) => {
  return (
    <BasicNotificationContent
      {...props}
      className="bg-red-200"
      progressBarClassName="bg-red-500"
    />
  );
};

const Notification = ({
  isOpen,
  onClose,
  duration,
  isClosable,
  content,
}: {
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
  isClosable?: boolean;
  content: ContentFn;
}) => {
  const countdown = useCountdown(duration, onClose);
  return (
    <Portal>
      <div
        className={`animate__animated animate__faster pointer-events-none fixed bottom-0 z-in-modal flex w-full justify-center text-center`}
      >
        <div
          className="pointer-events-auto w-fit-content"
          onMouseEnter={() => countdown.setIsPaused(true)}
          onMouseLeave={() => countdown.setIsPaused(false)}
        >
          {content({
            isOpen,
            onClose,
            duration,
            isClosable,
            countdown,
          })}
        </div>
      </div>
    </Portal>
  );
};
Notification.displayName = "Notification";
