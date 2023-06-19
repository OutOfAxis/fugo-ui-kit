import { createContext, ReactNode, useContext, useState } from "react";
import { useEventCallback } from "../useEventCallback";
import { v4 as uuid } from "uuid";
import { Portal } from "@radix-ui/react-portal";

type PortalContextValue = <ReturnType = void>(
  content: (props: PortalContentProps<ReturnType>) => ReactNode
) => Promise<ReturnType>;

type PortalContentProps<ReturnType = void> = {
  onClose: (value: ReturnType) => void;
};

const PortalContext = createContext<PortalContextValue>(
  (async () => {}) as any
);

export const usePortal = () => {
  return useContext(PortalContext);
};

type PortalItem<ReturnType = void> = {
  id: string;
  content: (props: PortalContentProps<ReturnType>) => ReactNode;
  onClose: (value: ReturnType) => void;
};

export const PortalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<Array<PortalItem<any>>>([]);

  const handleOpen = useEventCallback(
    (content: (props: PortalContentProps<any>) => ReactNode) =>
      new Promise<any>((resolve) => {
        setState((state) => {
          const id = uuid();
          return [
            ...state,
            {
              id,
              content,
              onClose: (value) => {
                setState((state) => state.filter((item) => item.id !== id));
                resolve(value);
              },
            },
          ];
        });
      })
  );

  return (
    <PortalContext.Provider value={handleOpen}>
      {state.map(({ id, content, onClose }) => (
        <Portal key={id}>{content({ onClose })}</Portal>
      ))}
      {children}
    </PortalContext.Provider>
  );
};
PortalProvider.displayName = "PortalProvider";
