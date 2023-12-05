import type { CourseDifficulty } from './enum';

export type Timestamp = {
  created_at: string;
  updated_at: string;
};

export type User = Timestamp & {
  email: string;
  token: string;
  username: string;
  password: string;
  phone_number: string;
};

export type CourseCategory = Timestamp & {
  id: string;
  name: string;
  image: string;
};

export type CourseMaterial = Timestamp & {
  id: string;
  name: string;
  video: string;
  order_index: number;
  course_chapter_id: string;
};

export type CourseChapter = Timestamp & {
  id: string;
  name: string;
  image: string;
  duration: number;
  course_id: string;
  order_index: number;
  course_material: CourseMaterial[];
  course_material_id: string;
};

export type Course = Timestamp & {
  id: string;
  name: string;
  code: string;
  user: User;
  image: string;
  price: number;
  author: string;
  rating: number;
  premium: boolean;
  user_id: string;
  telegram: string;
  difficulty: CourseDifficulty;
  description: string;
  intro_video: string;
  total_duration: number;
  course_chapter: CourseChapter[];
  total_materials: number;
  course_category: CourseCategory;
  onboarding_text: string;
  target_audience: string[];
  course_category_id: string;
};
