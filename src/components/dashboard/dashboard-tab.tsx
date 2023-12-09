import { useState } from 'react';
import { clsx } from 'clsx';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import type { MotionProps, Transition, Variants } from 'framer-motion';
import type { Tab } from '../../lib/hooks/use-tabs';

type DashboardTabProps = {
  tabs: Tab[];
  selectedTabIndex: number;
  setSelectedTab: (input: [number, number]) => void;
};

export function DashboardTab({
  tabs,
  selectedTabIndex,
  setSelectedTab
}: DashboardTabProps): JSX.Element {
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  return (
    <motion.nav
      className='relative z-0 flex flex-shrink-0 items-center py-2'
      onHoverEnd={() => setHoveredTab(null)}
    >
      <LayoutGroup id='tabs'>
        {tabs.map(({ id, href, label }, i) => {
          const isHoveredTab = i === hoveredTab;
          const isSelectedTab = i === selectedTabIndex;

          return (
            <MotionLink
              className={clsx(
                `text-md relative flex h-8 cursor-pointer select-none items-center 
               rounded-md px-4 text-sm text-primary-neutral-300 transition-colors`,
                (isHoveredTab || isSelectedTab) && '!text-black'
              )}
              href={href}
              onFocus={() => setHoveredTab(i)}
              onClick={() => setSelectedTab([i, i > selectedTabIndex ? 1 : -1])}
              onHoverStart={() => setHoveredTab(i)}
              key={id}
            >
              <span className='z-20'>{label}</span>
              {isSelectedTab && (
                <motion.div
                  transition={tabTransition}
                  layoutId='underline'
                  className='absolute -bottom-2 left-2 right-2 z-10 h-0.5 bg-primary-blue-500'
                />
              )}
              <AnimatePresence>
                {isHoveredTab && (
                  <motion.div
                    className='absolute bottom-0 left-0 right-0 top-0 z-10 rounded-md bg-gray-200'
                    {...tabVariants}
                    transition={tabTransition}
                    layoutId='hover'
                  />
                )}
              </AnimatePresence>
            </MotionLink>
          );
        })}
      </LayoutGroup>
    </motion.nav>
  );
}

const MotionLink = motion(Link);

const tabTransition: Transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.15
};

const tabVariants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

type DashboardTabContentProps = PropsWithChildren<{
  direction: number;
  className?: string;
  selectedTabIndex: number;
}>;

export function DashboardTabContent({
  children,
  className,
  direction,
  selectedTabIndex
}: DashboardTabContentProps): JSX.Element {
  return (
    <AnimatePresence mode='wait' custom={direction}>
      <motion.div
        key={selectedTabIndex}
        variants={contentVariants}
        initial='enter'
        animate='center'
        exit='exit'
        custom={direction}
        className={className}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

const contentVariants: Variants = {
  center: { opacity: 1, x: 0, scale: 1, rotate: 0 },
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    scale: 0.8,
    opacity: 0
  }),
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    scale: 0.8,
    opacity: 0,
    position: 'absolute'
  })
};
