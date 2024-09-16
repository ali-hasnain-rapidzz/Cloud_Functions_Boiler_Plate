import { z, ZodSchema } from "zod";

export const createValidationSchema = (fieldName: string, fieldType: ZodSchema) => {
  return z.object({
    [fieldName]: fieldType,
  });
};

export const phoneValidationSchema = z.object({
  phone: z.string(),
});
export type phoneValidationType = z.infer<typeof phoneValidationSchema>;

export const emailValidationSchema = z.object({
  email: z.string().email(),
});

export type ValidationType<T extends ZodSchema> = z.infer<T>;
