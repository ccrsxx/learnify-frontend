export const difficulty = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const;

export type Difficulty = (typeof difficulty)[number];

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

export type Category = Timestamp & {
  id: string;
  name: string;
  image: string;
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
  difficulty: Difficulty;
  description: string;
  intro_video: string;
  course_category: Category;
  onboarding_text: string;
  target_audience: string[];
  course_category_id: string;
};
