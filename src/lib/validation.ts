import isMobilePhone from 'validator/es/lib/isMobilePhone';
import { z } from 'zod';

export const nameSchema = z
  .string()
  .trim()
  .min(1, { message: 'Nama tidak boleh kosong' });

export const phoneNumberSchema = z
  .string()
  .trim()
  .min(1, { message: 'Nomor telepon tidak boleh kosong' })
  .startsWith('+62', { message: 'Nomor telepon harus diawali dengan +62' })
  .refine((val) => isMobilePhone(val, 'id-ID', { strictMode: true }), {
    message: 'Nomor telepon tidak valid'
  });

export const emailSchema = z
  .string()
  .trim()
  .min(1, { message: 'Email tidak boleh kosong' })
  .email({ message: 'Email tidak valid' });

// TODO: Inherit validation from emailSchema and phoneNumberSchema
export const emailOrPhoneNumberSchema = z
  .string()
  .trim()
  .min(1, { message: 'Email atau nomor telepon tidak boleh kosong' })
  .refine(
    (val) =>
      emailSchema.safeParse(val).success ||
      phoneNumberSchema.safeParse(val).success,
    {
      message: 'Email atau nomor telepon tidak valid'
    }
  );

export const passwordSchema = z
  .string()
  .trim()
  .min(1, { message: 'Password tidak boleh kosong' });
