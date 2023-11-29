export const COURSE_TYPES = ['all', 'premium', 'free'] as const;
export const COURSE_FILTERS = ['new', 'popular', 'promo'] as const;
export const COURSE_DIFFICULTIES = [
  'all',
  'beginner',
  'intermediate',
  'advanced'
] as const;

export type CourseType = (typeof COURSE_TYPES)[number];
export type CourseFilter = (typeof COURSE_FILTERS)[number];
export type CourseDifficulty = (typeof COURSE_DIFFICULTIES)[number];
