import { styled } from "../styled";
import { Tab, TabList, Tabs, TabPanels, TabPanel } from "../TabsExt";

export const CardWithTabs = styled(
  Tabs
)`bg-white rounded-lg shadow-sm flex flex-col overflow-hidden pt-4`;
CardWithTabs.displayName = "CardWithTabs";

export const CardTabList = styled(
  TabList
)`flex flex-shrink-0 xs:text-lg sm:text-2xl font-bold border-b border-gray-300 h-12`;
CardTabList.displayName = "CardTabList";

export const CardTab = styled(Tab)`mx-0 sm:mx-6`;
CardTab.displayName = "CardTab";

export { TabPanels, TabPanel };
