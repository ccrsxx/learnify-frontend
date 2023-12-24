import type { Difficulty, PaymentMethod, PaymentStatus } from './enum';

export type BaseRecord = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type User = BaseRecord & {
  name: string;
  email: string;
  token: string;
  admin: boolean;
  password: string;
  phone_number: string;
};

export type UserPayment = BaseRecord & {
  user: User;
  status: PaymentStatus;
  course: Course;
  user_id: string;
  paid_at: string;
  course_id: string;
  expired_at: string;
  payment_method: PaymentMethod;
};

export type CourseCategory = BaseRecord & {
  name: string;
  image: string;
};

export type CourseMaterialStatus = BaseRecord & {
  user_id: string;
  completed: boolean;
  course_material_id: string;
};

export type CourseMaterial = BaseRecord & {
  name: string;
  video: string;
  order_index: number;
  course_chapter_id: string;
  course_material_status: CourseMaterialStatus[];
};

export type CourseChapter = BaseRecord & {
  name: string;
  image: string;
  duration: number;
  course_id: string;
  order_index: number;
  course_material: CourseMaterial[];
  course_material_id: string;
};

export type UserCourse = BaseRecord & {
  user_id: string;
  course_id: string;
  onboarded: boolean;
};

export type Course = BaseRecord & {
  name: string;
  code: string;
  image: string | null;
  price: number;
  author: string;
  rating?: number;
  premium: boolean;
  user_id: string;
  telegram: string;
  difficulty: Difficulty;
  description: string;
  intro_video: string;
  user_course?: UserCourse[];
  total_duration: number;
  course_chapter?: CourseChapter[];
  total_materials: number;
  course_category: CourseCategory;
  onboarding_text: string;
  target_audience: string[];
  course_category_id: string;
  total_completed_materials?: number;
};

export type Statistic = Record<
  'total_users' | 'active_courses' | 'premium_courses',
  number
>;
