export const COURSE_TYPES = ['all', 'premium', 'free'] as const;
export const COURSE_FILTERS = ['new', 'popular', 'promo'] as const;
export const COURSE_DIFFICULTIES = [
  'beginner',
  'intermediate',
  'advanced'
] as const;

export type CourseType = (typeof COURSE_TYPES)[number];
export type CourseFilter = (typeof COURSE_FILTERS)[number];
export type CourseDifficulty = (typeof COURSE_DIFFICULTIES)[number];

export const MY_COURSE_TYPES = ['all', 'ongoing', 'completed'] as const;

export type MyCourseType = (typeof MY_COURSE_TYPES)[number];

export const TYPES = ['FREE', 'PREMIUM'] as const;

export type Type = (typeof TYPES)[number];

export const DIFFICULTIES = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];

export const PAYMENT_STATUS = [
  'PENDING',
  'WAITING_VERIFICATION',
  'COMPLETED'
] as const;
export const PAYMENT_METHODS = ['BANK_TRANSFER', 'CREDIT_CARD'] as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[number];
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
