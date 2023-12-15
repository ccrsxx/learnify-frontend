'use client';

import { useTabs } from '@/lib/hooks/use-tabs';
import { useStatistics } from '@/lib/hooks/use-statistics';
import { Widget } from '@/components/dashboard/widget';
import { DashboardTab } from '@/components/ui/tab';
import { WidgetSkeleton } from '@/components/common/skeleton';
import type { ReactNode } from 'react';
import type { Tab } from '@/lib/hooks/use-tabs';
import type { WidgetProps } from '@/components/dashboard/widget';

export default function Layout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const { tabProps } = useTabs({ tabs: dashboardTabs });

  const { data, isLoading } = useStatistics();

  const { total_users, active_courses, premium_courses } = data?.data ?? {};

  const dashboardWidgets: WidgetProps[] = [
    {
      id: 'active-users',
      label: 'Active Users',
      color: 'bg-primary-blue-300',
      value: total_users ?? 0
    },
    {
      id: 'active-courses',
      label: 'Active Courses',
      color: 'bg-primary-alert-success',
      value: active_courses ?? 0
    },
    {
      id: 'premium-courses',
      label: 'Premium Class',
      color: 'bg-primary-blue-500',
      value: premium_courses ?? 0
    }
  ];

  return (
    <main className='grid grid-rows-[auto,1fr]'>
      <section className='pt-8'>
        <div className='layout grid gap-4'>
          <section className='course-card-layout'>
            {dashboardWidgets.map((widget) =>
              isLoading ? (
                <WidgetSkeleton key={widget.id} />
              ) : (
                <Widget {...widget} key={widget.id} />
              )
            )}
          </section>
          <DashboardTab {...tabProps} />
        </div>
        <hr />
      </section>
      <section className='pt-8'>
        <div className='layout mb-8'>{children}</div>
      </section>
    </main>
  );
}

const dashboardTabs: Tab[] = [
  {
    id: 'dashboard',
    href: '/dashboard',
    label: 'Dashboard'
  },
  {
    id: 'courses',
    href: '/dashboard/courses',
    label: 'Kelola Kursus'
  }
];
