import { faker } from '@faker-js/faker';
import { DIFFICULTIES, PAYMENT_STATUS, PAYMENT_METHODS } from './types/enum';
import type { UserPayment, Course, CourseCategory, User } from './types/schema';

export function generateRandomUserPayment(): UserPayment {
  return {
    id: faker.string.uuid(),
    user: generateRandomUser(),
    status: faker.helpers.arrayElement(PAYMENT_STATUS),
    course: generateRandomCourse(),
    user_id: faker.string.uuid(),
    paid_at: faker.date.recent().toISOString(),
    course_id: faker.string.uuid(),
    expired_at: faker.date.future().toISOString(),
    payment_method: faker.helpers.arrayElement(PAYMENT_METHODS),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString()
  };
}

export function generateRandomCourse(): Course {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    code: faker.lorem.slug({ min: 1, max: 1 }),
    price: faker.number.int({ min: 10_000, max: 100_000 }),
    image: faker.image.url(),
    author: faker.person.fullName(),
    rating: faker.number.float({ min: 0, max: 5 }),
    premium: faker.datatype.boolean(),
    user_id: faker.string.uuid(),
    telegram: faker.internet.url(),
    difficulty: faker.helpers.arrayElement(DIFFICULTIES),
    description: faker.lorem.paragraph(),
    intro_video: faker.internet.url(),
    course_chapter: [],
    total_duration: faker.number.int(),
    target_audience: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () => faker.lorem.words()
    ),
    course_category: generateRandomCourseCategory(),
    onboarding_text: faker.lorem.paragraph(),
    total_materials: faker.number.int(),
    course_category_id: faker.string.uuid(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString()
  };
}

export function generateRandomUser(): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    image: faker.image.avatar(),
    token: faker.string.uuid(),
    admin: faker.datatype.boolean(),
    password: faker.internet.password(),
    phone_number: faker.helpers.replaceSymbolWithNumber('+628##########'),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString()
  };
}

export function generateRandomCourseCategory(): CourseCategory {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.department(),
    image: faker.image.url(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString()
  };
}
