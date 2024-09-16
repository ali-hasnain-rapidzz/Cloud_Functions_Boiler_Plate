import { z, ZodSchema } from "zod";

export const createValidationSchema = (fieldName: string, fieldType: ZodSchema) => {
  return z.object({
    [fieldName]: fieldType,
  });
};

export const phoneValidationSchema = createValidationSchema("phone", z.string());
export type phoneValidationType = z.infer<typeof phoneValidationSchema>;

export const emailValidationSchema = createValidationSchema("email", z.string().email());

export type ValidationType<T extends ZodSchema> = z.infer<T>;
