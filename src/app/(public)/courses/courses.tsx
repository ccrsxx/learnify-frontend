'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { COURSE_TYPES, MY_COURSE_TYPES } from '@/lib/types/enum';
import { useCategories } from '@/lib/hooks/use-categories';
import { SearchBar } from '@/components/common/search-bar';
import { CourseCard } from '@/components/course/course-card';
import { Button } from '@/components/ui/button';
import { CourseFilters } from '@/components/course/course-filters';
import { CourseTypes } from '@/components/course/course-types';
import {
  CourseCardSkeleton,
  CourseFilterSkeleton
} from '@/components/common/skeleton';
import type { Entries } from '@/lib/types/helper';
import type { Course, CourseCategory } from '@/lib/types/schema';
import type {
  CourseType,
  CourseFilter,
  MyCourseType,
  CourseDifficulty
} from '@/lib/types/enum';
import type { CourseFiltersKey } from '@/components/course/course-filters';

type CoursesProps<T extends boolean> = {
  userCourses?: T;
  coursesData: { data: Course[] } | undefined;
  coursesLoading: boolean;
};

export type GenericCourseType<T extends boolean> = T extends true
  ? MyCourseType
  : CourseType;

export default function Courses<T extends boolean>({
  userCourses,
  coursesData,
  coursesLoading
}: CoursesProps<T>): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();

  const [search, setSearch] = useState(() => searchParams.get('search') ?? '');

  const [selectedCourseType, setSelectedCourseType] = useState<
    GenericCourseType<T>
  >(() => setInitialSelectedCourseType<T>(searchParams, userCourses));

  const [courseFilters, setCourseFilters] = useState<CourseFilters>(() =>
    setInitialCourseFilter(searchParams)
  );

  useEffect(() => {
    const applyFilters = (): void => {
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

      const params = new URLSearchParams();

      const trimmedCourseType = selectedCourseType.trim();
      const trimmedCourseSearch = search.trim();

      if (trimmedCourseType && trimmedCourseType !== 'all')
        params.set('type', trimmedCourseType);
      else params.delete('type');

      if (trimmedCourseSearch) params.set('search', trimmedCourseSearch);
      else params.delete('search');

      for (const [filterKey, selectedFilter] of Object.entries(
        selectedFilters
      ) as Entries<typeof selectedFilters>) {
        if (!selectedFilter.length) {
          params.delete(filterKey);
          continue;
        }

        params.set(filterKey, selectedFilter.join(','));
      }

      router.replace(
        `/${userCourses ? 'my-courses' : 'courses'}?${params.toString()}`,
        { scroll: false }
      );
    };

    const timeoutId = setTimeout(applyFilters, 200);

    return () => clearTimeout(timeoutId);
  }, [userCourses, search, selectedCourseType, courseFilters, router]);

  const handleCourseTypeClick = (type: GenericCourseType<T>) => (): void =>
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

  const handleResetFilters = (): void => {
    setSearch('');
    setCourseFilters(initialCourseFilters);
    setSelectedCourseType('all');

    router.replace('/courses', { scroll: false });
  };

  const categories = categoriesData?.data;
  const courses = coursesData?.data;

  return (
    <main className='min-h-screen bg-primary-blue-50'>
      <div className='layout grid gap-8 py-8'>
        <section className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-primary-blue-500'>
            {userCourses ? 'Kelas Berlajan' : 'Topik Kelas'}
          </h1>
          <SearchBar
            small
            placeholder='Cari kelas...'
            value={search}
            onSearchChange={setSearch}
          />
        </section>
        <section className='grid grid-cols-12 gap-8'>
          <section className='col-span-3'>
            <div className='grid gap-8 rounded-medium bg-white p-6 text-black'>
              {categoriesLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <CourseFilterSkeleton key={i} />
                ))
              ) : (
                <>
                  <CourseFilters
                    categories={categories as CourseCategory[]}
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
                  </section>
                </>
              )}
            </div>
          </section>
          <section className='col-span-9 grid content-start gap-6'>
            <CourseTypes
              disabled={coursesLoading}
              userCourses={userCourses}
              selectedCourseType={selectedCourseType}
              handleCourseTypeClick={handleCourseTypeClick}
            />
            <section className='course-card-layout'>
              {coursesLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <CourseCardSkeleton key={i} />
                ))
              ) : courses?.length ? (
                courses.map((course) => (
                  <CourseCard
                    course={course}
                    progress={userCourses}
                    key={course.id}
                  />
                ))
              ) : (
                <p className='col-span-full mx-auto max-w-md text-center font-medium text-black'>
                  Tidak ada kelas yang ditemukan. Silahkan coba kembali dengan
                  kata kunci yang berbeda.
                </p>
              )}
            </section>
          </section>
        </section>
      </div>
    </main>
  );
}

function setInitialSelectedCourseType<T extends boolean>(
  searchParams: URLSearchParams,
  userCourses?: T
): GenericCourseType<T> {
  const type = searchParams.get('type');

  let parsedType: GenericCourseType<T>;

  if (userCourses)
    parsedType = (
      MY_COURSE_TYPES.some((courseType) => courseType === type) ? type : 'all'
    ) as GenericCourseType<T>;
  else
    parsedType = (
      COURSE_TYPES.some((courseType) => courseType === type) ? type : 'all'
    ) as GenericCourseType<T>;

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
    beginner: false,
    intermediate: false,
    advanced: false
  }
};
