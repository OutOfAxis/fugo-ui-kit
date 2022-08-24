import { styled } from "../styled";
import { Tab, TabList, Tabs } from "../TabsExt";

export const ModalTabs = styled(Tabs)`flex flex-col h-full overflow-hidden`;

export const ModalTabList = styled(
  TabList
)`flex flex-shrink-0 text-2xl font-bold border-b border-gray-200 h-24`;

export const ModalTab = styled(Tab)`flex-1`;
