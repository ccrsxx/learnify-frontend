import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { PropsWithChildren, Dispatch, SetStateAction } from 'react';

export type Tab = PropsWithChildren<{
  id: string;
  href: string;
  label: string;
}>;

type Tabs = {
  tabProps: {
    tabs: Tab[];
    selectedTabIndex: number;
    setSelectedTab: Dispatch<SetStateAction<[number, number]>>;
  };
  selectedTab: Tab;
  contentProps: {
    direction: number;
    selectedTabIndex: number;
  };
};

type TabProps = {
  tabs: Tab[];
  initialTabId?: string;
};

export function useTabs({ tabs, initialTabId }: TabProps): Tabs {
  const pathname = usePathname();

  const [[selectedTabIndex, direction], setSelectedTab] = useState(() => {
    const parsedTabId = pathname.split('/').pop() ?? initialTabId;
    const indexOfInitialTab = tabs.findIndex(({ id }) => id === parsedTabId);

    return [indexOfInitialTab === -1 ? 0 : indexOfInitialTab, 0];
  });

  return {
    tabProps: {
      tabs,
      selectedTabIndex,
      setSelectedTab
    },
    selectedTab: tabs[selectedTabIndex],
    contentProps: {
      direction,
      selectedTabIndex
    }
  };
}
