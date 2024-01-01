import { z } from 'zod';
import { TYPES, DIFFICULTIES } from '../../../../lib/types/enum';

export const courseTypes = TYPES.map((type) => ({
  id: type,
  name: type.toLowerCase()
}));

export const difficultyTypes = DIFFICULTIES.map((type) => ({
  id: type,
  name: type.toLowerCase()
}));

const refinedSchema = z
  .object({
    type: z.enum(TYPES, { required_error: 'Tipe kelas tidak boleh kosong' }),
    price: z.union([
      z
        .number({ invalid_type_error: 'Harga tidak boleh kosong' })
        .int({ message: 'Harga tidak boleh desimal' })
        .min(1, { message: 'Harga tidak boleh kosong' }),
      z.null()
    ])
  })
  .refine(({ type, price }) => (type === 'FREE' ? true : price), {
    message: 'Harga tidak boleh kosong',
    path: ['price']
  });

const restSchema = z.object({
  name: z.string().trim().min(1, { message: 'Nama kelas tidak boleh kosong' }),
  code: z.string().trim().min(1, { message: 'Kode kelas tidak boleh kosong' }),
  author: z.string().trim().min(1, { message: 'Author tidak boleh kosong' }),
  intro_video: z
    .string()
    .trim()
    .min(1, { message: 'Intro link video tidak boleh kosong' })
    .url({ message: 'Intro link video tidak valid' }),
  telegram: z
    .string()
    .trim()
    .min(1, { message: 'Link telegram tidak boleh kosong' })
    .url({ message: 'Link telegram tidak valid' }),
  course_category_id: z
    .string({ required_error: 'Kategori tidak boleh kosong' })
    .uuid({ message: 'Kategori tidak valid' }),
  difficulty: z.enum(DIFFICULTIES, {
    required_error: 'Level tidak boleh kosong'
  }),
  target_audience: z
    .array(
      z.object({
        name: z
          .string()
          .trim()
          .min(1, { message: 'Target audience tidak boleh kosong' })
      })
    )
    .max(5, { message: 'Target audience tidak boleh lebih dari 3' }),
  course_chapter: z.array(
    z.object({
      _id: z.string().optional(),
      name: z
        .string()
        .trim()
        .min(1, { message: 'Nama chapter tidak boleh kosong' }),
      duration: z
        .number({ invalid_type_error: 'Durasi tidak boleh kosong' })
        .int({ message: 'Durasi tidak boleh desimal' })
        .min(1, { message: 'Durasi tidak boleh kosong' }),
      course_material: z.array(
        z.object({
          _id: z.string().optional(),
          name: z
            .string()
            .trim()
            .min(1, { message: 'Nama materi tidak boleh kosong' }),
          video: z
            .string()
            .trim()
            .min(1, { message: 'Link video tidak boleh kosong' })
            .url({ message: 'Link video tidak valid' })
        })
      )
    })
  ),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Deskripsi tidak boleh kosong' }),
  onboarding_text: z
    .string()
    .trim()
    .min(1, { message: 'Onboarding text tidak boleh kosong' })
});

export const courseSchema = z.intersection(refinedSchema, restSchema);

export type CourseSchema = z.infer<typeof courseSchema>;
