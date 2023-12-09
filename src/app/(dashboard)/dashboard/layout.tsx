'use client';

import { clsx } from 'clsx';
import { MdGroup } from 'react-icons/md';
import { useTabs } from '@/lib/hooks/use-tabs';
import { DashboardTab } from '@/components/ui/tab';
import type { ReactNode } from 'react';
import type { Tab } from '@/lib/hooks/use-tabs';

export default function Layout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const { tabProps } = useTabs({ tabs: dashboardTabs });

  return (
    <main className='layout grid gap-4 py-8'>
      <section className='course-card-layout'>
        {dashboardWidgets.map(({ id, label, color, value }) => (
          <article
            className={clsx(
              'flex items-center gap-4 rounded-medium p-6',
              color
            )}
            key={id}
          >
            <div className='rounded-full bg-white p-3'>
              <MdGroup className='text-3xl text-primary-blue-500' />
            </div>
            <div>
              <p className='text-2xl font-semibold'>{value}</p>
              <p className='text-base'>{label}</p>
            </div>
          </article>
        ))}
      </section>
      <DashboardTab {...tabProps} />
      {children}
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

type Widget = {
  id: string;
  label: string;
  color: string;
  value: number;
};

const dashboardWidgets: Widget[] = [
  {
    id: 'active-users',
    label: 'Active Users',
    color: 'bg-primary-blue-300',
    value: 450
  },
  {
    id: 'active-courses',
    label: 'Active Courses',
    color: 'bg-primary-alert-success',
    value: 25
  },
  {
    id: 'premium-courses',
    label: 'Premium Class',
    color: 'bg-primary-blue-500',
    value: 20
  }
];
