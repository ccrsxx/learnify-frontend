import { renderHook, act } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { useTabs } from '../use-tabs';

jest.mock('next/navigation');

describe('useTabs', () => {
  it('should return initial tab correctly', () => {
    const tabs = [
      { id: 'tab1', href: '/tab1', label: 'Tab 1' },
      { id: 'tab2', href: '/tab2', label: 'Tab 2' }
    ];

    (usePathname as jest.Mock).mockReturnValue('/tab2');

    const { result } = renderHook(() =>
      useTabs({ tabs, initialTabId: 'tab1' })
    );

    expect(result.current.selectedTab).toEqual(tabs[1]);
  });

  it('should set selected tab correctly', () => {
    const tabs = [
      { id: 'tab1', href: '/tab1', label: 'Tab 1' },
      { id: 'tab2', href: '/tab2', label: 'Tab 2' }
    ];

    (usePathname as jest.Mock).mockReturnValue('/tab1');

    const { result } = renderHook(() =>
      useTabs({ tabs, initialTabId: 'tab1' })
    );

    act(() => {
      result.current.tabProps.setSelectedTab([1, 0]);
    });

    expect(result.current.selectedTab).toEqual(tabs[1]);
  });
});
