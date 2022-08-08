import { styled } from "../styled";
import { ComponentProps, HTMLAttributes } from "react";
import { Tab, TabList, Tabs } from "../TabsExt";

export const ModalTabs = styled(Tabs)`flex flex-col h-full overflow-hidden`;

export const ModalTabList = styled<HTMLAttributes<HTMLDivElement>>(
  TabList
)`flex flex-shrink-0 text-2xl font-bold border-b border-gray-200 h-24`;

export const ModalTab = styled<ComponentProps<typeof Tab>>(Tab)`flex-1`;
