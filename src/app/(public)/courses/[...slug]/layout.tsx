import { NEXT_PUBLIC_BACKEND_URL } from '@/lib/env';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import type { APIResponse } from '@/lib/types/api';
import type { Course } from '@/lib/types/schema';

export default function Layout({
  children
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}

export async function generateMetadata({
  params
}: {
  params: {
    slug: string[];
  };
}): Promise<Metadata> {
  const [courseId] = params.slug;

  const course = (await fetch(
    `${NEXT_PUBLIC_BACKEND_URL}/courses/${courseId}`
  ).then((res) => res.json())) as APIResponse<Course>;

  const courseName = course?.data?.name;

  return {
    title: `${courseName} | Learnify`
  };
}
