import { styled } from "../styled";
import { Tab, TabList, Tabs } from "../TabsExt";

export const ModalTabs = styled(Tabs)`flex flex-col h-full overflow-hidden`;
ModalTabs.displayName = "ModalTabs";

export const ModalTabList = styled(
  TabList
)`flex flex-shrink-0 text-lg sm:text-2xl font-bold border-b border-gray-200 h-16 sm:h-24`;
ModalTabList.displayName = "ModalTabList";

export const ModalTab = styled(Tab)`flex-1`;
ModalTab.displayName = "ModalTab";
