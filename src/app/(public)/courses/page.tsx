'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';
import { COURSE_TYPES } from '@/lib/types/enum';
import { SearchBar } from '@/components/common/search-bar';
import { CourseCard } from '@/components/course/course-card';
import { Button } from '@/components/ui/button';
import { CourseFilters } from '@/components/course/course-filters';
import { CourseTypes } from '@/components/course/course-types';
import {
  CourseCardSkeleton,
  CourseFilterSkeleton
} from '@/components/common/skeleton';
import type { ChangeEvent } from 'react';
import type { Category, Course } from '@/lib/types/schema';
import type {
  CourseType,
  CourseFilter,
  CourseDifficulty
} from '@/lib/types/enum';
import type { CourseFiltersKey } from '@/components/course/course-filters';

export default function Courses(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: coursesData, isLoading: coursesLoading } = useQuery<{
    data: Course[];
  }>({
    queryKey: ['courses'],
    queryFn: () => fetcher('/courses')
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery<{
    data: Category[];
  }>({
    queryKey: ['course-categories'],
    queryFn: () => fetcher('/course-categories')
  });

  const [search, setSearch] = useState(() => searchParams.get('search') ?? '');

  const [selectedCourseType, setSelectedCourseType] = useState<CourseType>(
    setInitialSelectedCourseType(searchParams)
  );

  const [courseFilters, setCourseFilters] = useState<CourseFilters>(
    setInitialCourseFilter(searchParams)
  );

  const handleSearchChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setSearch(value);

  const handleCourseTypeClick = (type: CourseType) => (): void =>
    setSelectedCourseType(type);

  const handleCourseFiltersChange =
    <T extends CourseFiltersKey>(filter: T, id: keyof CourseFilters[T]) =>
    () => {
      const currentFilter = courseFilters[filter];
      const currentFilterValue = !currentFilter[id];

      setCourseFilters({
        ...courseFilters,
        [filter]: {
          ...currentFilter,
          [id]: currentFilterValue
        }
      });
    };

  const handleApplyFilters = (): void => {
    const selectedFilters = Object.entries(courseFilters).reduce(
      (acc, [filterKey, selectedFilter]) => {
        const selected = Object.entries(selectedFilter).flatMap(
          ([key, selected]) => (selected ? key : [])
        );

        return {
          ...acc,
          [filterKey]: selected
        };
      },
      {} as { [key in CourseFiltersKey]: (keyof CourseFilters[key])[] }
    );

    const url = new URL(window.location.href);

    url.searchParams.set('type', selectedCourseType);
    url.searchParams.set('search', search.trim());

    Object.entries(selectedFilters).forEach(([filterKey, selectedFilter]) => {
      if (!selectedFilter.length) return;
      url.searchParams.set(filterKey, selectedFilter.join(','));
    });

    router.replace(url.toString(), { scroll: false });
  };

  const handleResetFilters = (): void => {
    setSelectedCourseType('all');
    setCourseFilters(initialCourseFilters);
  };

  const categories = categoriesData?.data;
  const loading = coursesLoading || categoriesLoading;

  return (
    <main className='min-h-screen bg-primary-blue-50'>
      <div className='layout grid gap-8 py-8'>
        <section className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-primary-blue-500'>
            Topik Kelas
          </h1>
          <SearchBar
            small
            placeholder='Cari kelas...'
            value={search}
            onChange={handleSearchChange}
          />
        </section>
        <section className='grid grid-cols-12 gap-8'>
          <section className='col-span-3'>
            <div className='grid gap-8 rounded-xl bg-white p-6 text-black'>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <CourseFilterSkeleton key={i} />
                ))
              ) : (
                <>
                  <CourseFilters
                    categories={categories as Category[]}
                    courseFilters={courseFilters}
                    handleCourseFiltersChange={handleCourseFiltersChange}
                  />
                  <section className='grid gap-2 text-white'>
                    <Button
                      className='clickable bg-primary-alert-error px-1 py-2'
                      onClick={handleResetFilters}
                    >
                      Hapus Filter
                    </Button>
                    <Button
                      className='clickable bg-primary-alert-success px-1 py-2'
                      onClick={handleApplyFilters}
                    >
                      Terapkan Filter
                    </Button>
                  </section>
                </>
              )}
            </div>
          </section>
          <section className='col-span-9 grid gap-6'>
            <CourseTypes
              disabled={loading}
              selectedCourseType={selectedCourseType}
              handleCourseTypeClick={handleCourseTypeClick}
            />
            <section className='course-card-layout'>
              {coursesLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <CourseCardSkeleton key={i} />
                  ))
                : coursesData?.data.map((course) => (
                    <CourseCard course={course} key={course.id} />
                  ))}
            </section>
          </section>
        </section>
      </div>
    </main>
  );
}

function setInitialSelectedCourseType(
  searchParams: URLSearchParams
): CourseType {
  const type = searchParams.get('type');

  const parsedType = COURSE_TYPES.some((courseType) => courseType === type)
    ? (type as CourseType)
    : 'all';

  return parsedType;
}

function setInitialCourseFilter(searchParams: URLSearchParams): CourseFilters {
  const filter = searchParams.get('filter')?.split(',') ?? [];
  const category = searchParams.get('category')?.split(',') ?? [];
  const difficulty = searchParams.get('difficulty')?.split(',') ?? [];

  const selectedCourseFilters: CourseFilters = {
    filter: filter.reduce(
      (acc, cur) => ({ ...acc, [cur]: true }),
      initialCourseFilters.filter
    ),
    category: category.reduce(
      (acc, cur) => ({ ...acc, [cur]: true }),
      initialCourseFilters.category
    ),
    difficulty: difficulty.reduce(
      (acc, cur) => ({ ...acc, [cur]: true }),
      initialCourseFilters.difficulty
    )
  };

  return selectedCourseFilters;
}

export type CourseFilters = {
  filter: Record<CourseFilter, boolean>;
  category: Record<string, boolean>;
  difficulty: Record<CourseDifficulty, boolean>;
};

const initialCourseFilters: CourseFilters = {
  filter: {
    new: false,
    promo: false,
    popular: false
  },
  category: {},
  difficulty: {
    all: false,
    beginner: false,
    intermediate: false,
    advanced: false
  }
};
