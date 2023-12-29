'use client';

import Link from 'next/link';
import CTA from '/public/assets/cta.png';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCategories } from '@/lib/hooks/query/use-categories';
import { useCourses } from '@/lib/hooks/query/use-courses';
import { CategoryCard } from '@/components/category/category-card';
import { CourseCard } from '@/components/course/course-card';
import { CategoryTag } from '@/components/category/category-tag';
import {
  CourseCardSkeleton,
  CategoryTagSkeleton,
  CategoryCardSkeleton
} from '@/components/common/skeleton';

export default function Home(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchParamsString = searchParams.toString();

  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();

  const { data: coursesData, isLoading: coursesLoading } =
    useCourses(searchParamsString);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(() =>
    searchParams.get('category')
  );

  useEffect(() => {
    if (!categoriesData?.data?.length) return;

    const validCategory = categoriesData.data.find(
      (category) => category.name === selectedCategory
    );

    if (!validCategory) return;

    setSelectedCategory(validCategory.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesData]);

  const handleCategoryClick = (id: string, name: string) => (): void => {
    if (selectedCategory === id) {
      setSelectedCategory(null);
      router.replace('/', { scroll: false });
      return;
    }

    const url = new URL(window.location.href);

    url.searchParams.set('category', name);

    router.replace(url.toString(), { scroll: false });

    setSelectedCategory(id);
  };

  const courses = coursesData?.data;
  const categories = categoriesData?.data;

  return (
    <main>
      <section className='bg-primary-blue-500'>
        <div className='grid gap-4 md:grid-cols-12'>
          <section
            className='relative before:absolute before:h-full before:w-full before:bg-gradient-to-b before:from-transparent
                       before:to-primary-blue-500 md:col-span-8 md:before:bg-gradient-to-r'
          >
            <Image
              className='h-40 w-full object-cover md:h-80 md:object-fill'
              src={CTA}
              alt='CTA'
              placeholder='blur'
            />
          </section>
          <section
            className='mb-8 grid w-full content-center justify-center 
                       gap-2 bg-primary-blue-500 px-4 md:col-span-4 md:mb-0 md:px-12'
          >
            <div className='grid max-w-xs gap-4'>
              <h1 className='text-xl font-bold'>
                Belajar dari Praktisi Terbaik!
              </h1>
              <Link
                className='clickable rounded-medium bg-white px-2 py-3 text-center 
                           font-bold uppercase text-primary-blue-500'
                href='/courses'
              >
                Ikuti kelas
              </Link>
            </div>
          </section>
        </div>
      </section>
      <section className='bg-primary-blue-50 py-8'>
        <div className='layout grid gap-6'>
          <section className='flex justify-between'>
            <h2 className='text-xl font-bold text-black'>Kategori Belajar</h2>
            <Link
              className='custom-underline font-bold text-primary-blue-500'
              href='/courses'
            >
              Lihat Semua
            </Link>
          </section>
          <section className='category-card-layout text-black'>
            {categoriesLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <CategoryCardSkeleton key={i} />
                ))
              : categories?.map((category) => (
                  <CategoryCard category={category} key={category.id} />
                ))}
          </section>
        </div>
      </section>
      <section className='layout grid gap-6 py-8'>
        <section className='flex justify-between'>
          <h2 className='text-xl font-bold text-black'>Kursus Populer</h2>
          <Link
            className='custom-underline font-bold text-primary-blue-500'
            href='/courses'
          >
            Lihat Semua
          </Link>
        </section>
        <section className='item-center flex gap-4 overflow-x-auto'>
          {categoriesLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <CategoryTagSkeleton key={i} />
              ))
            : categories?.map((category) => (
                <CategoryTag
                  category={category}
                  selected={selectedCategory === category.id}
                  onClick={handleCategoryClick(category.id, category.name)}
                  key={category.id}
                />
              ))}
        </section>
        <section className='course-card-layout text-black'>
          {coursesLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))
            : courses?.map((course) => (
                <CourseCard homepage course={course} key={course.id} />
              ))}
        </section>
      </section>
    </main>
  );
}
